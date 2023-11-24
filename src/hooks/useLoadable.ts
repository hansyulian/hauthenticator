import { useCallback, useEffect, useMemo, useState } from "react";

export type LoadableData<DataType> = {
  data: DataType | undefined;
  error: unknown;
  state: AsyncLoadState;
  set: (data: Partial<DataType>) => Promise<void>;
  reload: () => Promise<void>;
}

export type LoadableOptions<DataType> = {
  id?: string;
  lazy?: boolean;
  clearDataOnError?: boolean;
  onSet?: (data: Partial<DataType>) => Promise<void> | void;
}

export const useLoadable = <DataType>(loadFunction: () => Promise<DataType>, options: LoadableOptions<DataType> = {}): LoadableData<DataType> => {
  const { lazy = true, clearDataOnError = false, onSet } = options;
  const [data, setData] = useState<DataType>();
  const [state, setState] = useState<AsyncLoadState>("UNLOADED");
  const [error, setError] = useState<unknown>();

  const reload = useCallback(async () => {
    setState("LOADING");
    try {
      const result = await loadFunction();
      setData(result);
      setState("LOADED");
    } catch (err) {
      if (clearDataOnError) {
        setData(undefined);
      }
      setState("ERROR");
      setError(err);
      console.error(err);
    }
  }, [clearDataOnError, loadFunction]);
  useEffect(() => {
    if (!lazy) {
      return;
    }
    reload();
  }, [reload, lazy]);

  const set = useCallback(async (_data: Partial<DataType>) => {
    await onSet?.(_data);
    const result = await loadFunction();
    setData(result);
  }, [onSet, loadFunction]);

  return useMemo(() => ({
    data,
    state,
    error,
    reload,
    set,
  }), [data, state, error, reload, set]);
};