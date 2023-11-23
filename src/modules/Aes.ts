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
  const result = CryptoJS.AES.decrypt(payload, secret).toString(CryptoJS.enc.Utf8);
  if (!result) {
    throw new BaseException("DecryptionFailed", {}, "12989abvas9d8f7345nlksadf07");
  }
  return result;
}