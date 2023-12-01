import { sortAuthenticators } from "./sortAuthenticators";

describe("Utils: sortAuthenticators", () => {
  const authenticator1: AuthenticatorExtended = {
    authenticator: {
      name: "Auth1",
      issuer: "Issuer1",
      algorithm: "sha1",
      digits: 6,
      type: "totp",
    },
    id: "1",
    status: "ACTIVE",
    encryptedSecret: "encryptedSecret1",
    isFavourite: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  const authenticator2: AuthenticatorExtended = {
    authenticator: {
      name: "Auth2",
      issuer: "Issuer2",
      algorithm: "sha256",
      digits: 6,
      type: "totp",
    },
    id: "2",
    status: "ACTIVE",
    encryptedSecret: "encryptedSecret2",
    isFavourite: false,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  const authenticator3: AuthenticatorExtended = {
    authenticator: {
      name: "Auth3",
      issuer: "Issuer2", // Same issuer as authenticator2
      algorithm: "sha1",
      digits: 6,
      type: "totp",
    },
    id: "3",
    status: "ACTIVE",
    encryptedSecret: "encryptedSecret3",
    isFavourite: true,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  const authenticator4: AuthenticatorExtended = {
    authenticator: {
      name: "Auth4", // Different name but same issuer as authenticator3
      issuer: "Issuer2",
      algorithm: "sha1",
      digits: 6,
      type: "totp",
    },
    id: "4",
    status: "ACTIVE",
    encryptedSecret: "encryptedSecret4",
    isFavourite: false,
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
  };

  it("1. should sort authenticators correctly", () => {
    const authenticators = [authenticator2, authenticator1, authenticator3, authenticator4];
    const result = sortAuthenticators(authenticators);

    // Expected order: authenticator1 (isFavourite=true), authenticator3 (same issuer, different name), authenticator4 (same issuer, different name), authenticator2
    expect(result).toEqual([authenticator1, authenticator3, authenticator4, authenticator2]);
  });

  it("2. should handle empty authenticators array", () => {
    const result = sortAuthenticators([]);
    expect(result).toEqual([]);
  });

  it("3. should handle authenticators with the same properties", () => {
    const authenticators = [authenticator1, authenticator1, authenticator1];
    const result = sortAuthenticators(authenticators);

    // Since all authenticators have the same properties, the order should remain the same
    expect(result).toEqual([authenticator1, authenticator1, authenticator1]);
  });

  it("4. should handle authenticators with undefined properties", () => {
    const authenticatorUndefined: AuthenticatorExtended = {
      authenticator: {
        algorithm: "sha1",
        digits: 6,
        type: "totp",
      },
      id: "4",
      status: "ACTIVE",
      encryptedSecret: "encryptedSecret4",
      isFavourite: false,
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z",
    };

    const authenticators = [authenticator1, authenticatorUndefined];
    const result = sortAuthenticators(authenticators);

    // Authenticator with undefined properties should come last
    expect(result).toEqual([authenticator1, authenticatorUndefined]);
  });
});
