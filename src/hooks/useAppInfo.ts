import { useDataContext } from "./useDataContext";

export function useAppInfo() {
  const dataContext = useDataContext();
  return dataContext.appInfo;
}