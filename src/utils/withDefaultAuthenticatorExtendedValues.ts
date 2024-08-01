import { uuid } from "./uuid";

export function withDefaultAuthenticatorExtendedValues(
  values: AuthenticatorExtendedFormData
): AuthenticatorExtended {
  const nowString = new Date().toString();
  return {
    createdAt: nowString,
    updatedAt: nowString,
    encryptedSecret: "",
    id: uuid(),
    status: "ACTIVE",
    ...values,
  };
}
