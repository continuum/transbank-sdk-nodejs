import {Configuration} from "./configuration"
import Environments from "./environments"
import ConsoleLogger from "./logger/consoleLogger"
import LoggerInterface from "./logger/loggerInterface"
import NullLogger from "./logger/nullLogger"
import {verifySignature} from "./signature"
import SoapWsSecurity from "./soapWsSecurity"
import InitTransactionOutput from "./webpayNormal/initTransactionOutput"
import {createClient} from 'soap'

export default class WebpayWebService {
    protected configuration: Configuration
    protected environment: keyof typeof Environments
    protected logger: LoggerInterface

    constructor(configuration: Configuration, logger: LoggerInterface | null = null) {
        this.configuration = configuration
        this.environment = this.configuration.environment

        if (logger !== null) {
            this.logger = logger
        } else {
            this.logger = new NullLogger()
        }
    }

    public wsdlUrls() {
        return {}
    }

    protected getWsdlUrl(environment = null) {
        const key: string = ''
        if (environment === null) {
            key = this.environment
        }
        return this.wsdlUrls()[key]
    }

    public createSoapClient() {
        const wsdlUrl = this.getWsdlUrl()
        const options = {
            ignoredNamespaces: {
                namespaces: [],
                override: true
            }
        }

        return new Promise((resolve, reject) => {
            createClient(wsdlUrl, options, (err, client) => {
                if (err) {
                    throw new Error(err)
                }
                const wsSecurity = new SoapWsSecurity(this.configuration.privateKey, this.configuration.publicCert)
                wsSecurity.promise().then(() => {
                    client.setSecurity(wsSecurity)
                    resolve(client)
                })
            })
        })
    }

    public execute(method, params?: object): Promise<object | null> {
        return new Promise(async (resolve, reject) => {
            this.logger.log(params, 'REQUEST(' + method + ')')
            const client = await this.createSoapClient()
            client[method](params, (err, result, raw, soapHeader) => {

                this.logger.log(client.lastRequest, 'RAW REQUEST')
                this.logger.log(raw, 'RAW RESPONSE')

                if (err) {
                    throw new Error(err)
                }
                if (!verifySignature(raw, this.configuration.webpayCert)) {
                    throw new Error('Invalid signature response')
                }

                let response = result ? result.return : null
                this.logger.log(response, 'RESPONSE')

                resolve(response)


            })
        })
    }
}
