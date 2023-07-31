import { LoadableData } from "@hooks/useLoadable";
import { useLoadableAppInfoDataContext } from "@hooks/useLoadableAppInfoDataContext";
import { useLoadableAuthenticatorDataContext } from "@hooks/useLoadableAuthenticatorDataContext";
import { useLoadableSensitiveDataDataContext } from "@hooks/useLoadableSensitiveDataDataContext";
import { AppInfoStoreData } from "@storage/AppInfoStore";
import { AuthenticatorStoreData } from "@storage/AuthenticatorStore";
import { SensitiveDataStoreData } from "@storage/SensitiveDataStore";
import React, { createContext, PropsWithChildren, useMemo, FC } from "react";

export type DataContextValue = {
  authenticator: LoadableData<AuthenticatorStoreData>;
  appInfo: LoadableData<AppInfoStoreData>;
  sensitiveData: LoadableData<SensitiveDataStoreData>;
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const authenticator = useLoadableAuthenticatorDataContext();
  const appInfo = useLoadableAppInfoDataContext();
  const sensitiveData = useLoadableSensitiveDataDataContext();
  const value = useMemo<DataContextValue>(() => {
    return {
      authenticator,
      appInfo,
      sensitiveData,
    };
  }, [authenticator, appInfo, sensitiveData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
