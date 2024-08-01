import { OtpMigration, ParsedMigrationPayload } from "./OtpMigration";

describe("Module: OtpMigration", () => {
  describe("OtpMigration.decode", () => {
    it("1. should be able to decode otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIQARgBIAEoew%3D%3D", () => {
      const result = OtpMigration.decode(
        "otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIQARgBIAEoew%3D%3D"
      );
      expect(result).toEqual({
        batchId: 123,
        batchIndex: 1,
        batchSize: 1,
        otpParameters: [
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest",
            name: "nametest",
            secret: "SECRETTESQ",
          },
        ],
        version: 1,
      });
    });
    it("2. should be able to decode otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIKKgoGkQUSTmSUEgtuYW1ldGVzdDEyMxoNaXNzdWVydGVzdDEyMyABKAEwAhABGAUgASjIAw%3D%3D", () => {
      const result = OtpMigration.decode(
        "otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIKKgoGkQUSTmSUEgtuYW1ldGVzdDEyMxoNaXNzdWVydGVzdDEyMyABKAEwAhABGAUgASjIAw%3D%3D"
      );
      expect(result).toEqual({
        batchId: 456,
        batchIndex: 1,
        batchSize: 5,
        otpParameters: [
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest",
            name: "nametest",
            secret: "SECRETTESQ",
          },
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest123",
            name: "nametest123",
            secret: "SECRETTESQ",
          },
        ],
        version: 1,
      });
    });
  });
  describe("OtpMigration.encode", () => {
    it("1. should be able to encode", () => {
      const result = OtpMigration.encode({
        batchId: 123,
        batchIndex: 1,
        batchSize: 1,
        otpParameters: [
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest",
            name: "nametest",
            secret: "SECRETTESQ",
          },
        ],
        version: 1,
      });
      expect(result).toStrictEqual(
        "otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIQARgBIAEoew%3D%3D"
      );
    });
    it("2. should be able to encode", () => {
      const result = OtpMigration.encode({
        batchId: 456,
        batchIndex: 1,
        batchSize: 5,
        otpParameters: [
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest",
            name: "nametest",
            secret: "SECRETTESQ",
          },
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest123",
            name: "nametest123",
            secret: "SECRETTESQ",
          },
        ],
        version: 1,
      });
      expect(result).toStrictEqual(
        "otpauth-migration://offline?data=CiQKBpEFEk5klBIIbmFtZXRlc3QaCmlzc3VlcnRlc3QgASgBMAIKKgoGkQUSTmSUEgtuYW1ldGVzdDEyMxoNaXNzdWVydGVzdDEyMyABKAEwAhABGAUgASjIAw%3D%3D"
      );
    });
  });
  describe("OtpMigration boomerang", () => {
    it("1. should be able to encode and decode back", () => {
      const payload: ParsedMigrationPayload = {
        batchId: 456,
        batchIndex: 1,
        batchSize: 5,
        otpParameters: [
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest",
            name: "nametest",
            secret: "YSDUK7ZGN52TPHPA",
          },
          {
            algorithm: "sha1",
            type: "totp",
            digits: 6,
            issuer: "issuertest123",
            name: "nametest123",
            secret: "YSDUK7ZGN52TPHPA",
          },
        ],
        version: 1,
      };
      const encoded = OtpMigration.encode(payload);
      expect(OtpMigration.decode(encoded)).toEqual(payload);
    });
  });
});
