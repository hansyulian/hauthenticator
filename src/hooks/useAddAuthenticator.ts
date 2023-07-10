import { useCallback } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";
import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";

export const useAddAuthenticator = () => {
  const { data, set } = useAuthenticatorDataContext();
  return useCallback(async (form: AuthenticatorFormData) => {
    const newRecord = withDefaultAuthenticatorValues(form);
    const newAuthenticators = [...(data?.authenticators || []), newRecord];
    newAuthenticators.sort((a, b) => {
      if (a.issuer === b.issuer) {
        return a.name < b.name ? -1 : 1;
      }
      return a.issuer < b.issuer ? -1 : 1;
    });
    console.log(data?.authenticators, newAuthenticators);
    await set({
      authenticators: newAuthenticators,
    })
  }, [data?.authenticators, set])
}