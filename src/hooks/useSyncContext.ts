import { useContext } from "react";

import { SyncContext } from "~/modules/SyncContext";

export const useSyncContext = () => {
  const context = useContext(SyncContext);

  if (context === undefined) {
    throw new Error("useSync must be used within a SyncProvider");
  }

  return context;
};
