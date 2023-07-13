import { config } from "@config/config";
import { LoadableData, useLoadable } from "@hooks/useLoadable";
import { AppInfoStore, AppInfoStoreData } from "@storage/AppInfoStore";
import { AuthenticatorStore, AuthenticatorStoreData } from "@storage/AuthenticatorStore";
import { SensitiveDataStore, SensitiveDataStoreData } from "@storage/SensitiveDataStore";
import React, { createContext, PropsWithChildren, useMemo, FC, useCallback } from "react";

export type DataContextValue = {
  authenticator: LoadableData<AuthenticatorStoreData>;
  appInfo: LoadableData<AppInfoStoreData>;
  sensitiveData: LoadableData<SensitiveDataStoreData>;
};

export const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
  const authenticator = useLoadable(useCallback(async () => {
    const data = await AuthenticatorStore.get();
    if (config.isDevMode && config.authenticatorsDataReplacement) {
      console.log('devmode override authenticator data', !!config.authenticatorsDataReplacement)
      data.authenticators = config.authenticatorsDataReplacement;
    }
    return data;
  }, []), {
    id: 'authenticator',
    onSet: useCallback(async (data: AuthenticatorStoreData) => {
      await AuthenticatorStore.set(data);
    }, [])
  });
  const appInfo = useLoadable(useCallback(() => AppInfoStore.get(), []), {
    id: 'appInfo',
    onSet: useCallback(async (data: AppInfoStoreData) => {
      await AppInfoStore.set(data);
    }, [])
  });
  const sensitiveData = useLoadable(useCallback(async () => SensitiveDataStore.get(), []), {
    id: 'sensitiveData',
    onSet: useCallback(async (data: SensitiveDataStoreData) => {
      await SensitiveDataStore.set(data);
    }, [])
  });
  const value = useMemo<DataContextValue>(() => {
    return {
      authenticator,
      appInfo,
      sensitiveData,
    };
  }, [authenticator, appInfo, sensitiveData]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
