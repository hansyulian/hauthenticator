import { useCallback } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";
import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";
import { uuid } from "@utils/uuid";
import { withDefaultAuthenticatorExtendedValues } from "@utils/withDefaultAuthenticatorExtendedValues";
import { useEncryption } from "./useEncryption";
import { sortAuthenticators } from "@utils/sortAuthenticators";

export const useAddAuthenticators = () => {
  const { data, set } = useAuthenticatorDataContext();
  const encryption = useEncryption();
  return useCallback(async (forms: AuthenticatorFormData[]) => {
    const newRecords = forms.map(form => withDefaultAuthenticatorExtendedValues({
      id: uuid() as string,
      status: "ACTIVE",
      authenticator: withDefaultAuthenticatorValues(form),
      encryptedSecret: encryption.encrypt(form.secret),
    }));
    const newAuthenticators = [...(data?.authenticators || []), ...newRecords];
    const sortedAuthenticators = sortAuthenticators(newAuthenticators);
    await set({
      authenticators: sortedAuthenticators,
    });
  }, [data?.authenticators, encryption, set]);
};