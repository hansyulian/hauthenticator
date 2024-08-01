import { useContext } from "react";

import { AuthenticationContext } from "~/modules/AuthenticationContext";

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error("useAuthenticationContext must be used within a AuthenticationProvider");
  }

  return context;
};
