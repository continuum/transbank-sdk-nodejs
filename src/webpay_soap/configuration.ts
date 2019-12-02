import * as keys from './configuration_keys';

const DEFAULT_ENV = 'INTEGRACION';
const DEFAULT_CONSTRUCTOR_ARGS = {
    environment: DEFAULT_ENV,
    commerceCode: null,
    privateKey: null,
    publicCert: null,
    webpayCert: null,
    storeCodes: []
};

export class Configuration {

    private DEFAULT_ENVIRONMENT: string = DEFAULT_ENV;
    private _environment: string|null = this.DEFAULT_ENVIRONMENT;
    private _commerceCode: string|null = null;
    private _privateKey: string|null = null;
    private _publicCert: string|null = null;
    private _webpayCert: string|null = null;
    private _storeCodes: Array<string>|null = null;

    private static keys = keys;
    private static WEBPAY_PLUS_NORMAL_DEFAULT_COMMERCE_CODE = "597020000540";
    private static WEBPAY_PLUS_MALL_DEFAULT_COMMERCE_CODE = "597044444401";
    private static WEBPAY_PLUS_DIFERIDO_DEFAULT_COMMERCE_CODE = "597044444404";
    private static WEBPAY_ONECLICK_DEFAULT_COMMERCE_CODE = "597044444405";
    private static WEBPAY_PATPASS_BY_WEBPAY_DEFAULT_COMMERCE_CODE = "597020000548";


    constructor(params:
                Partial<{environment: string|null, commerceCode: string|null, privateKey: string|null, publicCert: string|null, webpayCert:string|null, storeCodes: Array<string>|null}> = DEFAULT_CONSTRUCTOR_ARGS) {
        Object.assign(this, params);
    }

    get defaultEnvironment() {
        if (this.environment && this.environment != '') {
            return this.environment;
        }
        return this.DEFAULT_ENVIRONMENT;
    }

    static forTestingWebpayPlusNormal() {
        const commerceCode = this.WEBPAY_PLUS_NORMAL_DEFAULT_COMMERCE_CODE;
        return new Configuration({
            commerceCode,
            privateKey: this.keys.WEBPAY_PLUS_INTEGRATION_DEFAULT_PRIVATE_KEY,
            publicCert: this.keys.WEBPAY_PLUS_INTEGRATION_DEFAULT_PUBLIC_CERTIFICATE,
            webpayCert: this.keys.WEBPAY_CERTIFICATE_INTEGRATION
        });
    }

    static forTestingWebpayPlusMall() {
        const commerceCode =  this.WEBPAY_PLUS_MALL_DEFAULT_COMMERCE_CODE;
        return new Configuration({
            commerceCode,
            privateKey: this.keys.WEBPAY_PLUS_MALL_INTEGRATION_DEFAULT_PRIVATE_KEY,
            publicCert: this.keys.WEBPAY_PLUS_MALL_INTEGRATION_DEFAULT_PUBLIC_CERTIFICATE,
            webpayCert: this.keys.WEBPAY_CERTIFICATE_INTEGRATION
        });
    }

    static forTestingWebpayPlusDiferido() {
        const commerceCode =  this.WEBPAY_PLUS_DIFERIDO_DEFAULT_COMMERCE_CODE;
        return new Configuration({
            commerceCode,
            privateKey: this.keys.WEBPAY_PLUS_DIFERIDO_INTEGRATION_DEFAULT_PRIVATE_KEY,
            publicCert: this.keys.WEBPAY_PLUS_DIFERIDO_INTEGRATION_DEFAULT_PUBLIC_CERTIFICATE,
            webpayCert: this.keys.WEBPAY_CERTIFICATE_INTEGRATION
        });
    }

    static forTestingWebpayOneclick() {
        const commerceCode =  this.WEBPAY_ONECLICK_DEFAULT_COMMERCE_CODE;
        return new Configuration({
            commerceCode,
            privateKey: this.keys.WEBPAY_ONECLICK_INTEGRATION_DEFAULT_PRIVATE_KEY,
            publicCert: this.keys.WEBPAY_ONECLICK_INTEGRATION_DEFAULT_PUBLIC_CERTIFICATE,
            webpayCert: this.keys.WEBPAY_CERTIFICATE_INTEGRATION
        });
    }

    static forTestingPatPassByWebpayNormal() {
        const commerceCode =  this.WEBPAY_PATPASS_BY_WEBPAY_DEFAULT_COMMERCE_CODE;
        return new Configuration({
            commerceCode,
            privateKey: this.keys.PATPASS_BY_WEBPAY_INTEGRATION_DEFAULT_PRIVATE_KEY,
            publicCert: this.keys.PATPASS_BY_WEBPAY_INTEGRATION_DEFAULT_PUBLIC_CERTIFICATE,
            webpayCert: this.keys.WEBPAY_CERTIFICATE_INTEGRATION
        });
    }


    get environment(): string | null {
        return this._environment;
    }

    set environment(value: string | null) {
        this._environment = value;
    }

    get commerceCode(): string | null {
        return this._commerceCode;
    }

    set commerceCode(value: string | null) {
        this._commerceCode = value;
    }

    get privateKey(): string | null {
        return this._privateKey;
    }

    set privateKey(value: string | null) {
        this._privateKey = value;
    }

    get publicCert(): string | null {
        return this._publicCert;
    }

    set publicCert(value: string | null) {
        this._publicCert = value;
    }

    get webpayCert(): string | null {
        return this._webpayCert;
    }

    set webpayCert(value: string | null) {
        this._webpayCert = value;
    }

    get storeCodes(): Array<string> | null {
        return this._storeCodes;
    }

    set storeCodes(value: Array<string> | null) {
        this._storeCodes = value;
    }



}
