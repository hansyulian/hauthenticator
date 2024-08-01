import { useEffect } from "react";

export const useEffectDebug = (
  debugString: string,
  values: never[],
  printValues: boolean = false
) => {
  return useEffect(() => {
    if (printValues) {
      console.log(debugString, values);
    } else {
      console.log(debugString);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugString, printValues, ...values]);
};
