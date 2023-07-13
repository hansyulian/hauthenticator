import { useCallback } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext"
import { BaseException } from "@modules/BaseException";

export const useUpdateAuthenticator = () => {
  const { data, set } = useAuthenticatorDataContext();
  return useCallback(async (id: string, authenticatorExtended: AuthenticatorExtendedFormData) => {
    if (!data) {
      return;
    }
    const record = data.authenticators.find(d => d.id === id);
    if (!record) {
      throw new BaseException('AuthenticatorNotFound', { id })
    }
    record.authenticator = authenticatorExtended.authenticator;
    record.updatedAt = new Date().toString();
    await set({
      ...data
    })
  }, [])
}