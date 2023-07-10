import { useAuthentication } from "./useAuthentication";

const useAuthenticate = () => {
  const { authenticate } = useAuthentication();
  return authenticate
}