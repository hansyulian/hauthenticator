import { uuid } from "@utils/uuid";
import md5 from "md5";
import { SecureStoreBase } from "./SecureStoreBase";

export type SensitiveDataStoreData = {
  encryptionKey: string;
  backupPassword: string;
}

export const SensitiveDataStore = new SecureStoreBase<SensitiveDataStoreData>("sensitiveData", {
  encryptionKey: md5(uuid()),
  backupPassword: "",
});