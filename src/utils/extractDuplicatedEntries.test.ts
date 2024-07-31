import { extractDuplicatedEntries } from "@utils/extractDuplicatedEntries";

describe("extractDuplicatedEntries", () => {
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

  it("should return duplicated entries", () => {
    const authenticators: AuthenticatorComparisonDetail[] = [
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret1",
        authenticatorExtended: baseAuthenticatorExtended,
      },
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret2",
        authenticatorExtended: baseAuthenticatorExtended,
      },
      {
        issuer: "issuer2",
        name: "name2",
        secret: "secret2",
        authenticatorExtended: baseAuthenticatorExtended,
      },
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret1",
        authenticatorExtended: baseAuthenticatorExtended,
      },
      {
        issuer: "issuer2",
        name: "name2",
        secret: "secret1",
        authenticatorExtended: { ...baseAuthenticatorExtended, status: "DELETED" },
      },
    ];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(3);
    expect(result[0]).toEqual([authenticators[0], authenticators[1], authenticators[3]]);
  });

  it("should not return non-duplicated entries", () => {
    const authenticators: AuthenticatorComparisonDetail[] = [
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret1",
        authenticatorExtended: baseAuthenticatorExtended,
      },
      {
        issuer: "issuer2",
        name: "name2",
        secret: "secret2",
        authenticatorExtended: baseAuthenticatorExtended,
      },
    ];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(0);
  });

  it("should exclude DELETED entries", () => {
    const authenticators: AuthenticatorComparisonDetail[] = [
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret1",
        authenticatorExtended: { ...baseAuthenticatorExtended, status: "DELETED" },
      },
      {
        issuer: "issuer1",
        name: "name1",
        secret: "secret1",
        authenticatorExtended: baseAuthenticatorExtended,
      },
    ];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(0);
  });

  it("should handle empty input", () => {
    const authenticators: AuthenticatorComparisonDetail[] = [];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(0);
  });
});
