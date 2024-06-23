import { useAuthenticationContext } from "./useAuthentication";

export function usePreventAuthenticate() {
  const authenticationContext = useAuthenticationContext();
  return authenticationContext.preventAuthenticate;
}