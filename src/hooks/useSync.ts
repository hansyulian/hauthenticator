import { useSyncContext } from "./useSyncContext";

export const useSync = () => {
  const { sync } = useSyncContext();
  return sync;
};
