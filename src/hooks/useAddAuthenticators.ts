import { useCallback } from "react";

import { sortAuthenticators } from "~/utils/sortAuthenticators";
import { uuid } from "~/utils/uuid";
import { withDefaultAuthenticatorExtendedValues } from "~/utils/withDefaultAuthenticatorExtendedValues";
import { withDefaultAuthenticatorValues } from "~/utils/withDefaultAuthenticatorValues";

import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";
import { useEncryption } from "./useEncryption";
import { useSync } from "./useSync";

export const useAddAuthenticators = () => {
  const { data, set } = useAuthenticatorDataContext();
  const encryption = useEncryption();
  const sync = useSync();
  return useCallback(
    async (forms: AuthenticatorFormData[]) => {
      const newRecords = forms.map((form) =>
        withDefaultAuthenticatorExtendedValues({
          id: uuid() as string,
          status: "ACTIVE",
          authenticator: withDefaultAuthenticatorValues(form),
          encryptedSecret: encryption.encrypt(form.secret),
        })
      );
      const newAuthenticators = [...(data?.authenticators || []), ...newRecords];
      const sortedAuthenticators = sortAuthenticators(newAuthenticators);
      await set({
        authenticators: sortedAuthenticators,
      });
      sync();
    },
    [data?.authenticators, encryption, set, sync]
  );
};
