import { isDuplicatedAuthenticator } from "@utils/isDuplicatedAuthenticator";

describe("isDuplicatedAuthenticator", () => {
  it("should return true if encryptedSecret matches", () => {
    const a: AuthenticatorExtended = {
      authenticator: {
        name: "Test",
        issuer: "Issuer",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "1",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret1",
      isFavourite: true,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    const b: AuthenticatorExtended = {
      authenticator: {
        name: "Test",
        issuer: "Issuer",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "2",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret1",
      isFavourite: false,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    expect(isDuplicatedAuthenticator(a, b)).toBe(true);
  });

  it("should return true if issuer and name match", () => {
    const a: AuthenticatorExtended = {
      authenticator: {
        name: "Test",
        issuer: "Issuer",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "1",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret1",
      isFavourite: true,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    const b: AuthenticatorExtended = {
      authenticator: {
        name: "Test",
        issuer: "Issuer",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "2",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret2",
      isFavourite: false,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    expect(isDuplicatedAuthenticator(a, b)).toBe(true);
  });

  it("should return false if neither encryptedSecret nor issuer and name match", () => {
    const a: AuthenticatorExtended = {
      authenticator: {
        name: "Test1",
        issuer: "Issuer1",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "1",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret1",
      isFavourite: true,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    const b: AuthenticatorExtended = {
      authenticator: {
        name: "Test2",
        issuer: "Issuer2",
        algorithm: "sha256",
        digits: 6,
        type: "totp",
      },
      id: "2",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret2",
      isFavourite: false,
      createdAt: "2023-07-30T12:00:00Z",
      updatedAt: "2023-07-30T12:00:00Z",
    };
    expect(isDuplicatedAuthenticator(a, b)).toBe(false);
  });
});
