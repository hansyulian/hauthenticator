import { DependencyList, useCallback, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAsyncCallback = <T extends (...args: any[]) => any>(callback: T) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [loading, setLoading] = useState(false);
  const memoedCallback = useCallback(async (...args: Parameters<T>) => {
    setLoading(true);
    const result: ReturnType<T> = await callback(...args)
    setLoading(false);
    return result;
  }, [callback]);

  return {
    callback: memoedCallback,
    loading
  }
}