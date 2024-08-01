import { useDataContext } from "./useDataContext";

export function useAppInfoContext() {
  const dataContext = useDataContext();
  return dataContext.appInfo;
}
