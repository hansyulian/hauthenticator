import { BasicStoreBase } from "./BasicStoreBase";

export type AuthenticatorStoreData = {
  authenticators: AuthenticatorExtended[];
}

export const AuthenticatorStore = new BasicStoreBase<AuthenticatorStoreData>('authenticators', {
  authenticators: [],
})