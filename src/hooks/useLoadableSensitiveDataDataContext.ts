import { useCallback } from "react";

import { SensitiveDataStore, SensitiveDataStoreData } from "~/storage/SensitiveDataStore";

import { useLoadable } from "./useLoadable";

export const useLoadableSensitiveDataDataContext = () => {
  return useLoadable(
    useCallback(async () => SensitiveDataStore.get(), []),
    {
      id: "sensitiveData",
      onSet: useCallback(async (data: Partial<SensitiveDataStoreData>) => {
        await SensitiveDataStore.set(data);
      }, []),
    }
  );
};
