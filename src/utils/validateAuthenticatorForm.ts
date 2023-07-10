export function validateAuthenticatorForm(form: AuthenticatorFormData | undefined) {
  if (!form) {
    return false;
  }
  return form.secret.length >= 16;
}