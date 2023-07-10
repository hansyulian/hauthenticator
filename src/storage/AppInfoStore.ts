import { BasicStoreBase } from "./BasicStoreBase";

export type AppInfoStoreData = {
  privacyGuardEnabled: boolean,
}

export const AppInfoStore = new BasicStoreBase<AppInfoStoreData>('appInfo', {
  privacyGuardEnabled: false,
})