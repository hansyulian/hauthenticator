import { BasicStoreBase } from "./BasicStoreBase";
// why i decide to put the authenticator here? because of the limitation in expo secure store
// to only have size limit of 2048 bytes
// https://docs.expo.dev/versions/latest/sdk/securestore/
export type AuthenticatorStoreData = {
  authenticators: AuthenticatorExtended[];
};

export const AuthenticatorStore = new BasicStoreBase<AuthenticatorStoreData>("authenticators", {
  authenticators: [],
});
