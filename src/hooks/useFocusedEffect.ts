import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFocusedEffect = (callback: (isFocused: boolean) => void, dependencies: any[]) => {
  const isFocused = useIsFocused();
  return useEffect(() => {
    return callback(isFocused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, callback, ...dependencies]);
};
