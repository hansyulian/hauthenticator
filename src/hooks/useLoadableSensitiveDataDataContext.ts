import { SensitiveDataStore, SensitiveDataStoreData } from "@storage/SensitiveDataStore";
import { useCallback } from "react";
import { useLoadable } from "./useLoadable";

export const useLoadableSensitiveDataDataContext = () => {
  return useLoadable(useCallback(async () => SensitiveDataStore.get(), []), {
    id: 'sensitiveData',
    onSet: useCallback(async (data: SensitiveDataStoreData) => {
      await SensitiveDataStore.set(data);
    }, [])
  });
}