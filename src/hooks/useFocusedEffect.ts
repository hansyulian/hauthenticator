import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

export const useFocusedEffect = (callback: (isFocused: boolean) => void, dependencies: never[]) => {
  const isFocused = useIsFocused();
  return useEffect(() => {
    return callback(isFocused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, callback, ...dependencies]);
};