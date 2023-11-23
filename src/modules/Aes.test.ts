import { Aes } from "./Aes";

describe("Modules: Aes", () => {
  it("1. should be able to encrypt", () => {
    const secret = "super secret key";
    const encryptedMessage = Aes.encrypt("Hello World!", secret);
    const decryptedMessage = Aes.decrypt(encryptedMessage, secret);
    expect(decryptedMessage).toStrictEqual("Hello World!");
  });
  // it('2. should error if decrypt using wrong key', () => {
  //   const secret = 'super secret key';
  //   const encryptedMessage = Aes.encrypt('Hello World!', secret);
  //   const decryptedMessage = Aes.decrypt(encryptedMessage, secret + 'wrong');
  //   expect(decryptedMessage).toThrow();
  // });
});
