import { AppInfoStore, AppInfoStoreData } from "@storage/AppInfoStore";
import { useCallback } from "react";
import { useLoadable } from "./useLoadable";

export const useLoadableAppInfoDataContext = () => {
  return useLoadable(useCallback(() => AppInfoStore.get(), []), {
    id: "appInfo",
    onSet: useCallback(async (data: Partial<AppInfoStoreData>) => {
      await AppInfoStore.set(data);
    }, [])
  });
};