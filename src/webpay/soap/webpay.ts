import {WEBPAY_CERTIFICATE_INTEGRATION, WEBPAY_CERTIFICATE_PRODUCTION} from "./configuration_keys";
import {Configuration} from './configuration';
import {createClient} from 'soap';
import {WebPayUniqueAndSpecialNonStandardWSSecurityCert} from "./security";
import {SignedXml, xpath as select} from 'xml-crypto';
import {DOMParser} from 'xmldom';

interface InitTransactionBody {
    commerceCode: string,
    buyOrder: string,
    amount: number
}

import Environments from "./environments";

// initTransaction (create) -> getTransactionResult (commit) (internamente llama a getTrxResult + ACK en API tbk)
export default class Webpay {
    private static RESULT_CODES = {
        "0": "Transacción aprobada",
        "-1": "Rechazo de transacción",
        "-2": "Transacción debe reintentarse",
        "-3": "Error en transacción",
        "-4": "Rechazo de transacción",
        "-5": "Rechazo por error de tasa",
        "-6": "Excede cupo máximo mensual",
        "-7": "Excede límite diario por transacción",
        "-8": "Rubro no autorizado",
    };
    private static WSDL_URL = {
        "INTEGRACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "CERTIFICACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "TEST": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "LIVE": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "PRODUCCION": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl"
    };
    configuration: Configuration;
    environment: keyof typeof Environments;

    constructor(configuration: Configuration) {
        this.configuration = configuration;
        this.environment = this.configuration.environment;
    }

    static defaultCert(environment: keyof typeof Environments | null = null) {
        if (environment == Environments.PRODUCCION) {
            return WEBPAY_CERTIFICATE_PRODUCTION
        }
        return WEBPAY_CERTIFICATE_INTEGRATION
    }

    initTransaction(amount: number, buyOrder: string, sessionId: string, transactionType: string,
                    returnUrl: string, finalUrl: string) {
        const {commerceCode} = this.configuration;
        const body = {
            wsInitTransactionInput: {
                wSTransactionType: "TR_NORMAL_WS",
                sessionId,
                buyOrder,
                returnUrl,
                finalUrl,
                wsTransactionDetail: {
                    commerceCode,
                    buyOrder,
                    amount
                }
            }
        };


        const url = Webpay.WSDL_URL[this.environment];

        const options = {
            ignoredNamespaces: {
                namespaces: [],
                override: true
            }
        };
        const soapClient = createClient(url, options, (err, client) => {
            if (err) {
                throw new Error(err);
            }
            const sec = new WebPayUniqueAndSpecialNonStandardWSSecurityCert(
                this.configuration.privateKey,
                this.configuration.publicCert,
                'utf8');
            client.setSecurity(sec);
            client.WSWebpayServiceImplService.WSWebpayServiceImplPort.initTransaction({
                wsInitTransactionInput: body
            }, (err, result, raw, soapHeader) => {
                if (err) {
                    throw new Error(err);
                }
                if (this._verifySignature(raw)) {
                    return result.return;
                } else {
                    throw new Error('Invalid signature response');
                }
            });
        });

        return new Promise((resolve, reject) => {
            //resolve({url: 'https://google.com', token: 'chao'});
        });

    }

    _verifySignature(xml) {
        try {
            let doc = new DOMParser().parseFromString(xml, 'text/xml');
            let signature = select(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
            let sig = new SignedXml();
            //Hack to check non-standard transbank SignedInfo node
            sig["validateSignatureValue"] = function () {
                let signedInfo = select(doc, "//*[local-name(.)='SignedInfo']");
                if (signedInfo.length === 0) throw new Error("could not find SignedInfo element in the message");
                // @ts-ignore
                let signedInfoCanon = this.getCanonXml([this.canonicalizationAlgorithm], signedInfo[0]);
                signedInfoCanon = signedInfoCanon.toString().replace("xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\"", "xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"");
                // @ts-ignore
                let signer = this.findSignatureAlgorithm(this.signatureAlgorithm);
                // @ts-ignore
                let res = signer.verifySignature(signedInfoCanon, this.signingKey, this.signatureValue);
                if (!res) { // @ts-ignore
                    // @ts-ignore
                    this.validationErrors.push("invalid signature: the signature value " + this.signatureValue + " is incorrect");
                }
                return res
            };
            let webpayKey = this.configuration.webpayCert;
            sig.keyInfoProvider.getKeyInfo = (key, prefix) => {
                prefix = prefix || '';
                prefix = prefix ? prefix + ':' : prefix;
                return "<" + prefix + "X509Data></" + prefix + "X509Data>";
            };
            sig.keyInfoProvider.getKey = (keyInfo): Buffer => {
                return Buffer.from(webpayKey, 'utf-8')
            };
            // @ts-ignore
            sig.loadSignature(signature);
            let res = sig.checkSignature(xml);
            if (!res) {
                throw new Error(sig.validationErrors.join('; '));
            }
            return res;
        } catch (err) {
            console.log('SIGNATURE:::', err)
            return false;
        }
    }


    initTransactionRequest(body: InitTransactionBody) {

    }

    private initTransactionBody(body: InitTransactionBody) {

    }
}
