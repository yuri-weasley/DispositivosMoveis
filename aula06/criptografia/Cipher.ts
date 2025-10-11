import base64 from "react-native-base64";
import CryptoJS from "react-native-crypto-js";
import StoredKey from "./StoredKey";
import Utils from "./Utils";

export default class Cipher {
  public criptografar(strKey: StoredKey, texto: string): string {
    const iv = Utils.getWordArrayS(base64.decode(strKey.iv));
    const key = Utils.getWordArrayS(base64.decode(strKey.key));
    const textoCripto = CryptoJS.AES.encrypt(texto, key, { iv: iv });
    return base64.encode(textoCripto.toString());
  }
  public decriptografar(strKey: any, texto64: string): string {
    const iv = Utils.getWordArrayS(base64.decode(strKey.iv));
    const key = Utils.getWordArrayS(base64.decode(strKey.key));
    const textoCripto = base64.decode(texto64);
    const bytes = CryptoJS.AES.decrypt(textoCripto, key, { iv: iv });
    const texto = bytes.toString(CryptoJS.enc.Utf8);
    return texto;
  }
}

/*
Exemplo de utilização do Chiper:

function executar(strKey){
     var cipher = new Cipher();
     var mensagem = 'APENAS UM TESTE';
     var textoCripto = cipher.criptografar(strKey,mensagem);
     var textoDecripto = cipher.decriptografar(
                                 strKey,textoCripto);
     console.log(textoCripto);
     console.log(textoDecripto);  
 }
*/