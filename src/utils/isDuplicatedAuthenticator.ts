export function isDuplicatedAuthenticator(
  a: AuthenticatorComparisonDetail,
  b: AuthenticatorComparisonDetail
) {
  if (a.issuer === b.issuer) {
    if (a.secret === b.secret) {
      return true;
    }
    if (a.name === b.name) {
      return true;
    }
  }
  return false;
}
