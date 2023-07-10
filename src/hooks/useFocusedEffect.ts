import { useIsFocused } from "@react-navigation/native"
import { useEffect } from "react"

export const useFocusedEffect = (callback: (isFocused: boolean) => void, dependencies: any[]) => {
  const isFocused = useIsFocused();
  return useEffect(() => {
    return callback(isFocused);
  }, [isFocused, ...dependencies])
}