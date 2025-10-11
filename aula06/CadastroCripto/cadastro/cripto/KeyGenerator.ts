import CryptoJS from "react-native-crypto-js";
import EncryptedStorage from "react-native-encrypted-storage";
import base64 from "react-native-base64";
import StoredKey from "./StoredKey";
import Utils from "./Utils";

export default class KeyGenerator {
  public async restoreKey(nome: string): Promise<StoredKey | null> {
    try {
      const chave = await EncryptedStorage.getItem(nome);
      if (!chave) return null;
      return JSON.parse(chave) as StoredKey;
    } catch {
      return null;
    }
  }
  public async createKey(nome: string): Promise<StoredKey | null> {
    try {
      const iv = CryptoJS.lib.WordArray.random(16); // Vetor de aleatorização
      const salt = CryptoJS.lib.WordArray.random(128 / 8); // Vetor de aleatorização
      const key = CryptoJS.EvpKDF(nome, salt, {
        keySize: 512 / 32, // Tamanho da chave. Nesse caso, seriam 512 bits divididos por 32. Teríamos, assim, palavras de 32 bits
        iterations: 1000, // Vou pegar essa chave e fazer mil iterações randômicas para obter uma chave mais forte
      });
      const strKey = new StoredKey();
      strKey.iv = base64.encodeFromByteArray(Utils.getByteArray(iv)); // Guardar as informações em base64
      strKey.key = base64.encodeFromByteArray(Utils.getByteArray(key)); // Guardar as informações em base64

      // E o EncryptedStorage é o armazenamento criptografado da plataforma para guardar a chave no dispositivo do usuário.
      await EncryptedStorage.setItem(nome, JSON.stringify(strKey)); 
      return strKey;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
