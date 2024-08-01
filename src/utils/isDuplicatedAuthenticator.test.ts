import { isDuplicatedAuthenticator } from "~/utils/isDuplicatedAuthenticator";

describe("isDuplicatedAuthenticator", () => {
  const baseAuthenticatorExtended: AuthenticatorExtended = {
    authenticator: {
      algorithm: "sha256",
      digits: 6,
      type: "totp",
      name: "test",
      issuer: "testIssuer",
    },
    id: "1",
    status: "ACTIVE",
    encryptedSecret: "encryptedSecret",
    isFavourite: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("should return true if issuers and secrets are the same", () => {
    const a: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name1",
      secret: "secret1",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    const b: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name2",
      secret: "secret1",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    expect(isDuplicatedAuthenticator(a, b)).toBe(true);
  });

  it("should return true if issuers and names are the same", () => {
    const a: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name1",
      secret: "secret1",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    const b: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name1",
      secret: "secret2",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    expect(isDuplicatedAuthenticator(a, b)).toBe(true);
  });

  it("should return false if neither issuers nor secrets or names are the same", () => {
    const a: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name1",
      secret: "secret1",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    const b: AuthenticatorComparisonDetail = {
      issuer: "issuer2",
      name: "name2",
      secret: "secret2",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    expect(isDuplicatedAuthenticator(a, b)).toBe(false);
  });

  it("should return false if issuers are the same but neither secrets nor names are the same", () => {
    const a: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name1",
      secret: "secret1",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    const b: AuthenticatorComparisonDetail = {
      issuer: "issuer1",
      name: "name2",
      secret: "secret2",
      authenticatorExtended: baseAuthenticatorExtended,
    };

    expect(isDuplicatedAuthenticator(a, b)).toBe(false);
  });
});
