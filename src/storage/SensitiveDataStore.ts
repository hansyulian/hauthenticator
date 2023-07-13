import { BasicStoreBase } from "./BasicStoreBase";

export type SensitiveDataStoreData = {
  encryptionKey: string;
}

export const SensitiveDataStore = new BasicStoreBase<SensitiveDataStoreData>('sensitiveData', {
  encryptionKey: '',
})