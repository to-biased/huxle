import CryptoJS from "crypto-js";

const key: string = "AJLAK24298§$/)FAHKJKJAHSqwee14JSHA";

export function useEncryption() {
  function encrypt(msg: string) {
    var encryptedText: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
      msg,
      key
    );
    var convertedText: string = encryptedText.toString();
    console.log(convertedText);
    var replacedText = convertedText.replaceAll("/", "*");
    console.log(replacedText);
    return replacedText;
  }

  function decrypt(encryptedMsg: string) {
    var replacedText = encryptedMsg.replaceAll("*", "/");
    var decryptedArray: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(
      replacedText,
      key
    );
    var convertedText = decryptedArray.toString(CryptoJS.enc.Utf8);
    console.log(convertedText);
    return convertedText;
  }

  return { encrypt, decrypt };
}
