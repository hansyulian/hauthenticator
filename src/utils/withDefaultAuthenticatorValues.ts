
export function withDefaultAuthenticatorValues(values: AuthenticatorFormData): Authenticator {
  return {
    algorithm: 'sha1',
    digits: 6,
    type: 'totp',
    counter: {
      high: 0,
      low: 0,
      unsigned: false,
    },
    ...values,
  }
}