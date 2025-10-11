/* É necessário instalar o crypto-js, através do: npm install crypto-js

--> Palavra-chave: Conversões.

- ArrayBuffer (buffers de memória)
*/
import * as CryptoJS from "crypto-js";

export default class Utils {
  public static getByteArray(valoresWord: any): Uint8Array {
    const buffer = new ArrayBuffer(valoresWord.sigBytes);
    const bufferI32 = new Int32Array(buffer);
    bufferI32.map(
      (valor, index, array) => (array[index] = valoresWord.words[index])
    );
    return new Uint8Array(buffer);
  }
  public static getWordArray(valores: Uint8Array): any {
    const buffer = new ArrayBuffer(valores.length);
    const bufferUI8 = new Uint8Array(buffer);
    bufferUI8.map((valor, index, array) => (array[index] = valores[index]));
    const bufferI32 = new Int32Array(buffer);
    return CryptoJS.lib.WordArray.create(bufferI32);
  }
  public static getWordArrayS(valoresS: string): any {
    const valores = new Uint8Array(valoresS.length);
    valores.map(
      (valor, index, array) => (array[index] = valoresS.charCodeAt(index))
    );
    return this.getWordArray(valores);
  }
}
