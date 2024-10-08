import CryptoJS from "crypto-js";
import { BaseException } from "./BaseException";

export const Aes = {
  encrypt,
  decrypt,
};

function encrypt(payload: string, secret: string): string {
  return CryptoJS.AES.encrypt(payload, secret).toString();
}

function decrypt(payload: string, secret: string): string {
  try {
    const result = CryptoJS.AES.decrypt(payload, secret);
    const decryptedStringUtf8 = result.toString(CryptoJS.enc.Utf8);
    if (!decryptedStringUtf8) {
      throw new BaseException("DecryptionFailed", {}, "9324890bnk24lzcv091235lknh");
    }
    return decryptedStringUtf8;
  } catch (err) {
    throw new BaseException("DecryptionFailed", {}, "asdln235498basdflkj");
  }
}
