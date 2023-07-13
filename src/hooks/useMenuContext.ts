import { MenuContext } from "@modules/MenuContext";
import { useContext } from "react";

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
};
