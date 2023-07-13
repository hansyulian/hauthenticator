import { AuthenticationContext } from "@modules/AuthenticationContext";
import { useContext } from "react";

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error("useAuthenticationContext must be used within a AuthenticationProvider");
  }

  return context;
};
