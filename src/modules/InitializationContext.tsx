import { useAppInfo } from "@hooks/useAppInfo";
import { useAuthenticatorDataContext } from "@hooks/useAuthenticatorDataContext";
import { SplashScreen } from "@screens/SplashScreen";
import React, { createContext, PropsWithChildren, useMemo, FC } from "react";

export type InitializationContextValue = {
};

export const InitializationContext = createContext<InitializationContextValue | undefined>(undefined);

export const InitializationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { state: authenticatorState } = useAuthenticatorDataContext();
  const { state: appInfoState } = useAppInfo();

  const initialized = useMemo(() => {
    return authenticatorState === 'LOADED'
      && appInfoState === 'LOADED';
  }, [authenticatorState, appInfoState]);

  const value = useMemo(() => {
    return {
    };
  }, []);
  if (!initialized) {
    return <SplashScreen />
  }

  return <InitializationContext.Provider value={value}>
    {children}
  </InitializationContext.Provider>;
};
