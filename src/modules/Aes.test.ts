import { BaseException } from "./BaseException";
import { Aes } from "./Aes"; // Replace with the actual path to your Aes module

describe("Aes", () => {
  const payload = "somePayload";
  const secret = "someSecret";

  describe("encrypt", () => {
    test("should call CryptoJS.AES.encrypt with correct arguments", () => {
      const encrypted = Aes.encrypt(payload, secret);
      const decrypted = Aes.decrypt(encrypted, secret);
      // You can add assertions related to the actual encryption logic here
      expect(decrypted).toStrictEqual(payload);
      // ... other assertions
    });
  });

  describe("decrypt", () => {
    test("should throw BaseException if an unexpected error occurs", () => {
      // Simulate unexpected error during decryption
      expect(() => Aes.decrypt("encryptedPayload", secret)).toThrowError(
        new BaseException("DecryptionFailed", {}, "asdln235498basdflkj")
      );
    });
  });
});
