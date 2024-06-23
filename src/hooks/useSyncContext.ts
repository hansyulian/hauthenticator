import { SyncContext } from "@modules/SyncContext";
import { useContext } from "react";

export const useSyncContext = () => {
  const context = useContext(SyncContext);

  if (context === undefined) {
    throw new Error("useSync must be used within a SyncProvider");
  }

  return context;
};
