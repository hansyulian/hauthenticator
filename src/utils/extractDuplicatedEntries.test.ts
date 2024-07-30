import { extractDuplicatedEntries } from "@utils/extractDuplicatedEntries";

describe("extractDuplicatedEntries", () => {
  it("should return groups of duplicated entries based on isDuplicatedAuthenticator function", () => {
    const authenticators: AuthenticatorExtended[] = [
      {
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
      },
      {
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
      },
      {
        authenticator: {
          name: "Test1",
          issuer: "Issuer1",
          algorithm: "sha256",
          digits: 6,
          type: "totp",
        },
        id: "3",
        status: "ACTIVE",
        encryptedSecret: "encryptedSecret3",
        isFavourite: true,
        createdAt: "2023-07-30T12:00:00Z",
        updatedAt: "2023-07-30T12:00:00Z",
      },
    ];
    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(2);
    expect(result[0]).toEqual([authenticators[0], authenticators[2]]);
  });

  it("should return an empty array if no duplicated entries are found", () => {
    const authenticators: AuthenticatorExtended[] = [
      {
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
      },
      {
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
      },
    ];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(0);
  });

  it("should ignore entries with status other than ACTIVE", () => {
    const authenticators: AuthenticatorExtended[] = [
      {
        authenticator: {
          name: "Test1",
          issuer: "Issuer1",
          algorithm: "sha256",
          digits: 6,
          type: "totp",
        },
        id: "1",
        status: "DELETED",
        encryptedSecret: "encryptedSecret1",
        isFavourite: true,
        createdAt: "2023-07-30T12:00:00Z",
        updatedAt: "2023-07-30T12:00:00Z",
      },
      {
        authenticator: {
          name: "Test2",
          issuer: "Issuer2",
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
      },
      {
        authenticator: {
          name: "Test1",
          issuer: "Issuer1",
          algorithm: "sha256",
          digits: 6,
          type: "totp",
        },
        id: "3",
        status: "ACTIVE",
        encryptedSecret: "encryptedSecret1",
        isFavourite: true,
        createdAt: "2023-07-30T12:00:00Z",
        updatedAt: "2023-07-30T12:00:00Z",
      },
    ];

    const result = extractDuplicatedEntries(authenticators);

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(2);
    expect(result[0]).toEqual([authenticators[1], authenticators[2]]);
  });
});
