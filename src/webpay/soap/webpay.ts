import {Configuration} from "./configuration"
import LoggerInterface from "./logger/loggerInterface"
import NullLogger from "./logger/nullLogger"
import {WebpayNormal} from "./webpayNormal/webpayNormal"

export class Webpay {
    public static logger: LoggerInterface = new NullLogger
    protected configuration: Configuration

    public static setLogger(logger: LoggerInterface) {
        this.logger = logger
    }

    constructor(configuration: Configuration) {
        this.configuration = configuration
    }

    public getNormalTransaction() {
        return new WebpayNormal(this.configuration, Webpay.logger)
    }
}
