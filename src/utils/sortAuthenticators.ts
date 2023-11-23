export function sortAuthenticators(authenticators: AuthenticatorExtended[]) {
  const result = [...authenticators];
  result.sort((a, b) => {
    if (a.authenticator.issuer === b.authenticator.issuer) {
      return (a.authenticator.name || "") < (b.authenticator.name || "") ? -1 : 1;
    }
    return (a.authenticator.issuer) || "" < (b.authenticator.issuer || "") ? -1 : 1;
  });
  return result;
}