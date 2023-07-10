import { useEffect } from "react"

export const useEffectDebug = (debugString: string, values: any[], printValues: boolean = false) => {
  return useEffect(() => {
    if (printValues) {
      console.log(debugString, values)
    } else {
      console.log(debugString)
    }
  }, [...values, printValues])
}