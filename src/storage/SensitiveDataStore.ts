import { SecureStoreBase } from "./SecureStoreBase";

export type SensitiveDataStoreData = {
  encryptionKey: string;
}

export const SensitiveDataStore = new SecureStoreBase<SensitiveDataStoreData>('sensitiveData', {
  encryptionKey: '',
})