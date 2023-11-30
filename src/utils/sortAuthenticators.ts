export function sortAuthenticators(authenticators: AuthenticatorExtended[]) {
  const result = [...authenticators];
  result.sort((a, b) => {
    if (a.isFavourite !== b.isFavourite) {
      return a.isFavourite ? -1 : 1;
    }
    const aIssuer = a.authenticator.issuer?.toLowerCase() || "";
    const bIssuer = b.authenticator.issuer?.toLocaleLowerCase() || "";
    if (aIssuer === bIssuer) {
      const aName = a.authenticator.name?.toLowerCase() || "";
      const bName = b.authenticator.name?.toLocaleLowerCase() || "";
      return aName < bName ? -1 : 1;
    }
    return aIssuer < bIssuer ? -1 : 1;
  });
  return result;
}