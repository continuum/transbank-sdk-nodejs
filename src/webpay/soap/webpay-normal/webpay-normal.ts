import {Configuration} from '../configuration';
import Environments from "../environments";
import SoapWsSecurity from '../soap-ws-security';
import {createClient} from 'soap';
import InitTransactionOutput from "./init-transaction-output";

export class WebpayNormal {
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

    initTransaction(amount: number, buyOrder: string, returnURL: string, finalURL: string,  sessionId: string, transactionType: string = "TR_NORMAL_WS") : Promise<InitTransactionOutput> {
        const wsSecurity = new SoapWsSecurity(this.configuration.privateKey, this.configuration.publicCert);

        const {commerceCode} = this.configuration;
        const body = {
            wsInitTransactionInput: {
                wSTransactionType: "TR_NORMAL_WS",
                sessionId,
                buyOrder,
                returnURL,
                finalURL,
                transactionDetails: {
                    amount,
                    buyOrder,
                    commerceCode
                }
            }
        };
        const url = WebpayNormal.WSDL_URL[this.environment];

        const options = {
            ignoredNamespaces: {
                namespaces: [],
                override: true
            }
        };

        return new Promise((resolve, reject) => {
            createClient(url, options, (err, client) => {
                if (err) {
                    throw new Error(err);
                }
                client.setSecurity(wsSecurity);
                client.initTransaction(body, (err, result, raw, soapHeader) => {
                    if (err) {
                        throw new Error(err);
                    }
                    console.log(result.return);
                    resolve(new InitTransactionOutput(result.return.url, result.return.token));
                });
            });
            // resolve({url: 'https://google.com', token: 'chao'});
        });

    }
}

