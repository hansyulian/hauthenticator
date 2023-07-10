import { AppInfoStoreData } from "@storage/AppInfoStore";
import { useCallback } from "react";
import { useAppInfoContext } from "./useAppInfoContext";

export function useSetAppInfo() {
  const { data, set } = useAppInfoContext();
  return useCallback((appInfo: Partial<AppInfoStoreData>) => {
    if (!data) {
      return;
    }
    set({
      ...data,
      ...appInfo,
    })
  }, [data, set])
}