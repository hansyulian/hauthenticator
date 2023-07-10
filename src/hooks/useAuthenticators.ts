import { useMemo } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext"

export const useAuthenticators = () => {
  const authenticatorDataContext = useAuthenticatorDataContext();
  return useMemo(() => {
    return authenticatorDataContext.data?.authenticators || [];
  }, [authenticatorDataContext.data?.authenticators])
}