import { OtpAuthUrl } from "./OtpAuthUrl";

describe('OthAuthUrl', () => {
  describe('OthAuthUrl.decode', () => {
    it('1. should be able to decode otpauth://totp/AB-name%40test.com?secret=ABCDE12345', () => {
      const result = OtpAuthUrl.decode('otpauth://totp/AB-name%40test.com?secret=ABCDE12345');
      const {
        algorithm,
        digits,
        type,
        issuer,
        name,
        secret,
      } = result;
      expect(algorithm).toStrictEqual('sha1');
      expect(type).toStrictEqual('totp');
      expect(digits).toStrictEqual(6);
      expect(issuer).toStrictEqual('');
      expect(name).toStrictEqual('AB-name@test.com');
      expect(secret).toStrictEqual('ABCDE12345');
    });
    it('2. should be able to decode otpauth://totp/Abc%3A%20https%3A%2F%2Fcockpit.test.com%3Aname%40domain.com?secret=ABCDE12345ABCDE12345ABCDE12345ABCDE12345ABCDE12345&issuer=Abc%3A%20https%3A%2F%2Fcockpit.test.com', () => {
      const result = OtpAuthUrl.decode('otpauth://totp/Abc%3A%20https%3A%2F%2Fcockpit.test.com%3Aname%40domain.com?secret=ABCDE12345ABCDE12345ABCDE12345ABCDE12345ABCDE12345&issuer=Abc%3A%20https%3A%2F%2Fcockpit.test.com');
      const {
        algorithm,
        digits,
        type,
        issuer,
        name,
        secret,
      } = result;
      expect(algorithm).toStrictEqual('sha1');
      expect(type).toStrictEqual('totp');
      expect(digits).toStrictEqual(6);
      expect(issuer).toStrictEqual('Abc: https://cockpit.test.com');
      expect(name).toStrictEqual('Abc: https://cockpit.test.com:name@domain.com');
      expect(secret).toStrictEqual('ABCDE12345ABCDE12345ABCDE12345ABCDE12345ABCDE12345');
    })
  });
  describe('OtpAuthUrl.encode', () => {
    it('should be able to encode', () => {
      const result = OtpAuthUrl.encode({
        algorithm: 'sha1',
        type: 'totp',
        digits: 6,
        issuer: 'issuertest',
        name: 'nametest',
        secret: 'secrettest',
        counter: {
          high: 0,
          low: 0,
          unsigned: false,
        }
      });
      expect(result).toStrictEqual('otpauth://totp/issuertest%3Anametest?secret=secrettest&issuer=issuertest');
    })
  })
})