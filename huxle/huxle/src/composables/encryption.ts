import CryptoJS from "crypto-js";

const key: string = "AJLAK24298§$/)FAHKJKJAHSqwee14JSHA";

export function useEncryption() {
  function encrypt(msg: string) {
    var encryptedText:CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(msg, key);
    return encryptedText.toString()
  }

  function decrypt(encryptedMsg: string) {
    var decryptedArray:CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(encryptedMsg, key);
    return decryptedArray.toString(CryptoJS.enc.Utf8);
  }

  return { encrypt, decrypt };
}
