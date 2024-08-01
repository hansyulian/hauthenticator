import { useDataContext } from "./useDataContext";

export function useAuthenticatorDataContext() {
  const dataContext = useDataContext();
  return dataContext.authenticator;
}
