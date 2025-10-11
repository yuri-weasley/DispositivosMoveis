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
      const iv = CryptoJS.lib.WordArray.random(16);
      const salt = CryptoJS.lib.WordArray.random(128 / 8);
      const key = CryptoJS.EvpKDF(nome, salt, {
        keySize: 512 / 32,
        iterations: 1000,
      });
      const strKey = new StoredKey();
      strKey.iv = base64.encodeFromByteArray(Utils.getByteArray(iv));
      strKey.key = base64.encodeFromByteArray(Utils.getByteArray(key));
      await EncryptedStorage.setItem(nome, JSON.stringify(strKey));
      return strKey;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
