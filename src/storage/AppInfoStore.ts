import { BasicStoreBase } from "./BasicStoreBase";

export type AppInfoStoreData = {
  authenticationEnabled: boolean;
  googleDriveSyncEnabled: boolean;
};

export const AppInfoStore = new BasicStoreBase<AppInfoStoreData>("appInfo", {
  authenticationEnabled: false,
  googleDriveSyncEnabled: false,
});
