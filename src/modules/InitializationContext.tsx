import React, { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from "react";

import { useAppInfoContext } from "~/hooks/useAppInfoContext";
import { useAuthenticatorDataContext } from "~/hooks/useAuthenticatorDataContext";
import { useSensitiveDataContext } from "~/hooks/useSensitiveDataContext";
import { SplashScreen } from "~/screens/SplashScreen";

export type InitializationContextValue = {};

export const InitializationContext = createContext<InitializationContextValue | undefined>(
  undefined
);

export const InitializationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { state: authenticatorState } = useAuthenticatorDataContext();
  const { state: appInfoState } = useAppInfoContext();
  const {
    data: sensitiveData,
    state: sensitiveDataState,
    set: setSensitiveData,
  } = useSensitiveDataContext();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function initialize() {
      const statesInitialized = [authenticatorState, appInfoState, sensitiveDataState].filter(
        (state) => state !== "LOADED"
      );
      if (statesInitialized.length > 0) {
        return setInitialized(false);
      }
      if (!sensitiveData?.encryptionKey) {
        return setInitialized(false);
      }
      setInitialized(true);
    }
    initialize();
  }, [authenticatorState, appInfoState, sensitiveDataState, sensitiveData]);

  const value = useMemo(() => {
    return {};
  }, []);
  if (!initialized) {
    return <SplashScreen></SplashScreen>;
  }

  return <InitializationContext.Provider value={value}>{children}</InitializationContext.Provider>;
};
