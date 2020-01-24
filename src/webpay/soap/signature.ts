// Código basado en https://github.com/rgcl/webpay-nodejs.
// Agradecimientos a los autores de esta librería

const DOMParser = require('xmldom').DOMParser
import {SignedXml, xpath as select} from 'xml-crypto'

export function verifySignature(xml, webpayCert) {
    try {
        let doc = new DOMParser().parseFromString(xml)
        let signature = select(doc, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0]
        let sig = new SignedXml()

        //Hack to check non-standard transbank SignedInfo node
        sig.validateSignatureValue = function () {
            let signedInfo = select(doc, "//*[local-name(.)='SignedInfo']")
            if (signedInfo.length === 0) {
                throw new Error("could not find SignedInfo element in the message")
            }
            let signedInfoCanon = this.getCanonXml([this.canonicalizationAlgorithm], signedInfo[0])
            signedInfoCanon = signedInfoCanon.toString().replace("xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\"", "xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\"")
            let signer = this.findSignatureAlgorithm(this.signatureAlgorithm)
            let res = signer.verifySignature(signedInfoCanon, this.signingKey, this.signatureValue)
            if (!res) {
                this.validationErrors.push("invalid signature: the signature value " + this.signatureValue + " is incorrect")
            }
            return res
        }
        sig.keyInfoProvider = {
            getKeyInfo: function (key, prefix) {
                prefix = prefix || ''
                prefix = prefix ? prefix + ':' : prefix
                return "<" + prefix + "X509Data></" + prefix + "X509Data>"
            },
            getKey: function (keyInfo) {
                return webpayCert
            }
        }
        sig.loadSignature(signature)
        let res = sig.checkSignature(xml)
        if (!res) {
            throw new Error(sig.validationErrors.join('; '))
        }
        return res
    } catch (err) {
        console.log('Signature verification failed: ', err)
        return false
    }
}
