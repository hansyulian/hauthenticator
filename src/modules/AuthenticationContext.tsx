import React, { createContext, PropsWithChildren, useMemo, FC, useEffect, useState, useCallback, useRef } from "react";
import { LocalAuthenticationOptions, SecurityLevel, authenticateAsync } from 'expo-local-authentication';
import { useAuthenticatorDataContext } from "@hooks/useAuthenticatorDataContext";
import { useAppInfoContext } from "@hooks/useAppInfoContext";
import { ViewE } from "@components/ViewE";
import { checkDeviceAuthentication } from "@utils/checkDeviceAuthentication";
import { AppState, AppStateStatus } from "react-native";

export type AuthenticationContextValue = {
  authenticate: () => Promise<boolean>;
  deviceAuthenticationLevel: SecurityLevel | undefined;
};

export const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);
export type AuthenticateOptions = LocalAuthenticationOptions & { privacyGuard: boolean }

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { reload: reloadAuthenticators } = useAuthenticatorDataContext();
  const [requireInitialization, setRequireInitialization] = useState(true);
  const [deviceAuthenticationLevel, setDeviceAuthenticationLevel] = useState<SecurityLevel>();
  const [privacyGuard, setPrivacyGuard] = useState(true);
  const lastAppState = useRef<AppStateStatus>();
  const { data: appInfo, state: appInfoState } = useAppInfoContext();

  const authenticate = useCallback(async (options: Partial<AuthenticateOptions> = {}) => {
    const { privacyGuard, ...rest } = options;
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
  }, [])

  const initializeAuthenticated = useCallback(async () => {
    setRequireInitialization(false);
    setPrivacyGuard(false);
    return await Promise.all([
      reloadAuthenticators()
    ]);
  }, []);

  useEffect(() => {
    return AppState.addEventListener('change', async (state: AppStateStatus) => {
      if (state === 'background' && deviceAuthenticationLevel && deviceAuthenticationLevel > 0) {
        setPrivacyGuard(true);
      }
      if (state === 'active' && lastAppState.current === 'background' && appInfo?.authenticationEnabled) {
        authenticate();
      }
      lastAppState.current = state;
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
    };
  }, [authenticate]);

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
