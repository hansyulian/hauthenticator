import React, { createContext, useContext, PropsWithChildren, useMemo, FC, useEffect } from "react";
import * as LocalAuthentication from 'expo-local-authentication';
import { useAuthenticatorDataContext } from "@hooks/useAuthenticatorDataContext";

export type AuthenticationContextValue = {

};

const AuthenticationContext = createContext<AuthenticationContextValue | undefined>(undefined);

export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const { reload: reloadAuthenticators } = useAuthenticatorDataContext();
  const value = useMemo(() => {
    return {

    };
  }, []);

  useEffect(() => {
    reloadAuthenticators();
  }, [reloadAuthenticators]);
  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error("useAuthenticationContext must be used within a AuthenticationProvider");
  }

  return context;
};
