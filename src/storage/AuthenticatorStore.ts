import { SecureStoreBase } from "./SecureStoreBase";

export type AuthenticatorStoreData = {
  authenticators: Authenticator[];
}

export const AuthenticatorStore = new SecureStoreBase<AuthenticatorStoreData>('authenticators', {
  authenticators: [],
})