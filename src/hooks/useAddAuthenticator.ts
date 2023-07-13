import { useCallback } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext";
import { withDefaultAuthenticatorValues } from "@utils/withDefaultAuthenticatorValues";
import { uuid } from "@utils/uuid";
import { withDefaultAuthenticatorExtendedValues } from "@utils/withDefaultAuthenticatorExtendedValues";
import { useEncryption } from "./useEncryption";

export const useAddAuthenticators = () => {
  const { data, set } = useAuthenticatorDataContext();
  const encryption = useEncryption();
  return useCallback(async (forms: AuthenticatorFormData[]) => {
    const newRecords = forms.map(form => withDefaultAuthenticatorExtendedValues({
      id: uuid(),
      status: 'ACTIVE',
      authenticator: withDefaultAuthenticatorValues(form),
      encryptedSecret: encryption.encrypt(form.secret),
    }));
    const newAuthenticators = [...(data?.authenticators || []), ...newRecords];
    newAuthenticators.sort((a, b) => {
      if (a.authenticator.issuer === b.authenticator.issuer) {
        return a.authenticator.name < b.authenticator.name ? -1 : 1;
      }
      return a.authenticator.issuer < b.authenticator.issuer ? -1 : 1;
    });
    await set({
      authenticators: newAuthenticators,
    })
  }, [data?.authenticators, set])
}