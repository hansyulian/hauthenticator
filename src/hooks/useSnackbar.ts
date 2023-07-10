import { SnackbarContext } from "@modules/SnackbarContext";
import { useContext } from "react";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error("useSnackbarContext must be used within a SnackbarProvider");
  }

  return context;
};
