import { useContext } from "react";

import { DataContext } from "~/modules/DataContext";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
