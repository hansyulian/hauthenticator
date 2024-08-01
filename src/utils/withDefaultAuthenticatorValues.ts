export function withDefaultAuthenticatorValues(values: AuthenticatorFormData): Authenticator {
  return {
    algorithm: "sha1",
    digits: 6,
    type: "totp",
    ...values,
  };
}
