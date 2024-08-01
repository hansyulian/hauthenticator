import { useMemo } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";

export const useAuthenticators = () => {
  const { data: authenticatorData } = useAuthenticatorDataContext();
  return useMemo(() => {
    return authenticatorData?.authenticators.filter((record) => record.status === "ACTIVE") || [];
  }, [authenticatorData?.authenticators]);
};
