import {Configuration} from '../configuration'
import Environments from "../environments"

import WebpayWebService from "../webpayWebService"
import InitTransactionOutput from "./initTransactionOutput"

export class WebpayNormal extends WebpayWebService {
    protected static RESULT_CODES = {
        "0": "Transacción aprobada",
        "-1": "Rechazo de transacción",
        "-2": "Transacción debe reintentarse",
        "-3": "Error en transacción",
        "-4": "Rechazo de transacción",
        "-5": "Rechazo por error de tasa",
        "-6": "Excede cupo máximo mensual",
        "-7": "Excede límite diario por transacción",
        "-8": "Rubro no autorizado",
    }

    public wsdlUrls() {
        return {
            "INTEGRACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
            "CERTIFICACION": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
            "TEST": "https://webpay3gint.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
            "LIVE": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl",
            "PRODUCCION": "https://webpay3g.transbank.cl/WSWebpayTransaction/cxf/WSWebpayService?wsdl"
        }
    }

    public async initTransaction(amount: number, buyOrder: string, returnURL: string, finalURL: string, sessionId: string, transactionType: string = "TR_NORMAL_WS"): Promise<InitTransactionOutput> {
        const {commerceCode} = this.configuration
        const result = await this.execute("initTransaction", {
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
        })
        return new InitTransactionOutput(result.url, result.token)
    }


    public async getTransactionResult(token: string): Promise<object> {
        const result = await this.execute("getTransactionResult", {tokenInput: token})
        await this.acknowledgeTransaction(token)
        return result
    }

    public async acknowledgeTransaction(token: string): Promise<object> {
        return await this.execute("acknowledgeTransaction", {tokenInput: token})
    }
}

