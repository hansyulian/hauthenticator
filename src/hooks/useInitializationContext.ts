import { useContext } from "react";

import { InitializationContext } from "~/modules/InitializationContext";

export const useInitializationContext = () => {
  const context = useContext(InitializationContext);

  if (context === undefined) {
    throw new Error("useInitializationContext must be used within a TemplateProvider");
  }

  return context;
};
