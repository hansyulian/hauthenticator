import { useAuthenticationContext } from "./useAuthentication";

export const useAuthenticate = () => {
  const { authenticate } = useAuthenticationContext();
  return authenticate;
};