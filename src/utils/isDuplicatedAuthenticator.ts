export function isDuplicatedAuthenticator(a: AuthenticatorExtended, b: AuthenticatorExtended) {
  if (a.encryptedSecret === b.encryptedSecret) {
    return true;
  }
  if (b.authenticator.issuer === b.authenticator.issuer && a.authenticator.name === b.authenticator.name) {
    return true;
  }
  return false;
}