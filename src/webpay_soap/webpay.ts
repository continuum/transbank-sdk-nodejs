import { WEBPAY_CERTIFICATE_INTEGRATION, WEBPAY_CERTIFICATE_PRODUCTION } from "./configuration_keys";
import { Configuration } from './configuration';
import { createClient } from 'soap';

interface InitTransactionBody {
    commerceCode: string,
    buyOrder: string,
    amount: number
}
enum Environments {
    INTEGRACION = "INTEGRACION",
    CERTIFICACION = "INTEGRACION",
    TEST = "INTEGRACION",
    PRODUCCION = "PRODUCCION",
    LIVE = "PRODUCCION",
}

class Webpay {
    private static WSDL_URL = {
        "INTEGRACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "CERTIFICACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "TEST": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "LIVE": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
        "PRODUCCION": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl"
    };
    static defaultCert(environment: string | null = null) {
        if (environment == Webpay.PRODUCCION) {
            return WEBPAY_CERTIFICATE_PRODUCTION
        }
        return WEBPAY_CERTIFICATE_INTEGRATION
    }
    configuration: Configuration;
    environment: string;

    constructor(configuration: Configuration, environment: keyof typeof Environments) {
        this.configuration = configuration;
        this.environment = Environments[environment];
    }

    initTransaction(amount: number,buyOrder: string, sessionId: string, transactionType: string,
                    returnUrl: string, finalUrl: string) {
        const { commerceCode } = this.configuration;
        const body = {
            wsInitTransactionInput: {
                wSTransactionType: "TR_NORMAL_WS",
                sessionId,
                buyOrder,
                returnUrl,
                finalUrl,
                wsTransactionDetail: {
                    commerceCode: this.configuration.commerceCode,
                    buyOrder,
                    amount
                }
            }
        };

        const client = createClient('', (error, client) => {
            client
        });

        return client;
       // this.initTransactionRequest();
    }

    initTransactionRequest(body: InitTransactionBody) {

    }

    private initTransactionBody(body: InitTransactionBody) {

    }
}
