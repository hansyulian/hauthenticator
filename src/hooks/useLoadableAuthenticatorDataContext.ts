import { useCallback } from "react";

import { config } from "~/config/config";
import { AuthenticatorStore, AuthenticatorStoreData } from "~/storage/AuthenticatorStore";

import { useLoadable } from "./useLoadable";

const defaultAuthenticatorExtendedValues: Partial<AuthenticatorExtended> = {
  isFavourite: false,
};

export const useLoadableAuthenticatorDataContext = () => {
  return useLoadable(
    useCallback(async () => {
      const data = await AuthenticatorStore.get();
      if (config.isDevMode && config.authenticatorsDataReplacement) {
        console.log("devmode override authenticator data", !!config.authenticatorsDataReplacement);
        data.authenticators = config.authenticatorsDataReplacement;
      }
      const processedData: AuthenticatorStoreData = {
        ...data,
        authenticators: [],
      };
      for (const record of data.authenticators) {
        processedData.authenticators.push({
          ...defaultAuthenticatorExtendedValues,
          ...record,
        });
      }
      return processedData;
    }, []),
    {
      id: "authenticator",
      onSet: useCallback(async (data: Partial<AuthenticatorStoreData>) => {
        if (data.authenticators) {
          for (const authenticatorExtended of data.authenticators) {
            authenticatorExtended.createdAt = new Date(
              authenticatorExtended.createdAt
            ).toISOString();
            authenticatorExtended.updatedAt = new Date(
              authenticatorExtended.updatedAt
            ).toISOString();
          }
        }
        await AuthenticatorStore.set(data);
      }, []),
    }
  );
};
