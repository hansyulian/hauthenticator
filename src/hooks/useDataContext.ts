import { DataContext } from "@modules/DataContext";
import { useContext } from "react";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
