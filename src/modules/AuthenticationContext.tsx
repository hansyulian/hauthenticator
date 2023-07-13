import React, { createContext, PropsWithChildren, useMemo, FC, useEffect, useState, useCallback, useRef } from "react";
import { LocalAuthenticationOptions, SecurityLevel, authenticateAsync } from 'expo-local-authentication';
import { useAppInfoContext } from "@hooks/useAppInfoContext";
import { ViewE } from "@components/ViewE";
import { checkDeviceAuthentication } from "@utils/checkDeviceAuthentication";
import { AppState, AppStateStatus } from "react-native";

export type AuthenticationContextValue = {
  authenticate: () => Promise<boolean>;
  deviceAuthenticationLevel: SecurityLevel | undefined;
  preventAuthenticate: <T>(callback: AsyncCallback<T>) => Promise<T>
};

export const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);
export type AuthenticateOptions = LocalAuthenticationOptions & { privacyGuard: boolean }

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [requireInitialization, setRequireInitialization] = useState(true);
  const [deviceAuthenticationLevel, setDeviceAuthenticationLevel] = useState<SecurityLevel>();
  const [privacyGuard, setPrivacyGuard] = useState(true);
  const lastAppState = useRef<AppStateStatus>();
  const { data: appInfo, state: appInfoState } = useAppInfoContext();
  const authenticationMutex = useRef<boolean>(false)

  const authenticate = useCallback(async (options: Partial<AuthenticateOptions> = {}) => {
    const { privacyGuard = true, ...rest } = options;
    if (privacyGuard) {
      setPrivacyGuard(true);
    }
    const result = await authenticateAsync({
      ...rest,
    });
    if (result.success) {
      setPrivacyGuard(false);
    }
    return result.success;
  }, []);

  const preventAuthenticate = useCallback(async function <T>(fn: AsyncCallback<T>) {
    authenticationMutex.current = true;
    const result = await fn();
    authenticationMutex.current = false;
    return result;
  }, [])

  const initializeAuthenticated = useCallback(async () => {
    setRequireInitialization(false);
    setPrivacyGuard(false);
    return await Promise.all([

    ]);
  }, []);

  useEffect(() => {
    return AppState.addEventListener('change', async (nextState: AppStateStatus) => {
      if (nextState === 'active'
        && lastAppState.current === 'background'
        && appInfo?.authenticationEnabled
        && !authenticationMutex.current) {
        authenticate();
      }
      lastAppState.current = nextState;
    }).remove
  }, [appInfo?.authenticationEnabled, deviceAuthenticationLevel, authenticate])

  useEffect(() => {
    init();
    async function init() {
      if (deviceAuthenticationLevel === undefined
        || appInfoState !== 'LOADED'
        || !requireInitialization
        || !appInfo
      ) {
        return;
      }

      if (deviceAuthenticationLevel > 0 && appInfo.authenticationEnabled) {
        const result = await authenticate();
        if (!result) {
          return;
        }
      }
      initializeAuthenticated();
    }
  }, [authenticate, requireInitialization, deviceAuthenticationLevel, initializeAuthenticated, appInfo, appInfoState]);

  useEffect(() => {
    checkDeviceAuthentication().then(result => {
      setDeviceAuthenticationLevel(result);
    })
  }, [])
  const value = useMemo(() => {
    return {
      authenticate,
      deviceAuthenticationLevel,
      preventAuthenticate,
    };
  }, [authenticate, deviceAuthenticationLevel, preventAuthenticate]);

  if (appInfoState !== 'LOADED') {
    return null;
  }
  return <AuthenticationContext.Provider value={value}>
    {children}
    {privacyGuard && <ViewE
      floating="top-left"
      fullSize
      backgroundColor="surface"
    />}
  </AuthenticationContext.Provider>;
};
