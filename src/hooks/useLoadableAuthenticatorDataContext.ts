import { config } from "@config/config";
import { AuthenticatorStore, AuthenticatorStoreData } from "@storage/AuthenticatorStore";
import { useCallback } from "react";
import { useLoadable } from "./useLoadable";

export const useLoadableAuthenticatorDataContext = () => {
  return useLoadable(useCallback(async () => {
    const data = await AuthenticatorStore.get();
    if (config.isDevMode && config.authenticatorsDataReplacement) {
      console.log("devmode override authenticator data", !!config.authenticatorsDataReplacement);
      data.authenticators = config.authenticatorsDataReplacement;
    }
    return data;
  }, []), {
    id: "authenticator",
    onSet: useCallback(async (data: AuthenticatorStoreData) => {
      for (const authenticatorExtended of data.authenticators) {
        authenticatorExtended.createdAt = new Date(authenticatorExtended.createdAt).toISOString();
        authenticatorExtended.updatedAt = new Date(authenticatorExtended.updatedAt).toISOString();
      }
      await AuthenticatorStore.set(data);
    }, [])
  });
};