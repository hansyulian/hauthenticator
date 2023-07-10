import { config } from "@config/config";
import { LoadableData, useLoadable } from "@hooks/useLoadable";
import { AppInfoStore, AppInfoStoreData } from "@storage/AppInfoStore";
import { AuthenticatorStore, AuthenticatorStoreData } from "@storage/AuthenticatorStore";
import React, { createContext, PropsWithChildren, useMemo, FC, useCallback } from "react";

export type DataContextValue = {
  authenticator: LoadableData<AuthenticatorStoreData>;
  appInfo: LoadableData<AppInfoStoreData>;
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
    lazy: false,
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
  const value = useMemo<DataContextValue>(() => {
    return {
      authenticator,
      appInfo,
    };
  }, [authenticator, appInfo]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
