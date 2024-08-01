import { useDataContext } from "./useDataContext";

export function useSensitiveDataContext() {
  const dataContext = useDataContext();
  return dataContext.sensitiveData;
}
