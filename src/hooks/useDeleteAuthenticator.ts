import { useCallback } from "react";
import { useAuthenticatorDataContext } from "./useAuthenticatorDataContext"
import { BaseException } from "@modules/BaseException";

export const useDeleteAuthenticator = () => {
  const { data, set } = useAuthenticatorDataContext();

  return useCallback(async (id: string) => {
    if (!data) {
      return;
    }
    const authenticator = data.authenticators.find((authenticator) => authenticator.id === id);
    if (!authenticator) {
      throw new BaseException('AuthenticatorNotFound', { id });
    }
    authenticator.status = 'DELETED';
    await set({
      ...data,
      authenticators: [...data.authenticators]
    })
  }, [data, set])
}