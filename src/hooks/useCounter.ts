import { useState, useCallback, useRef } from "react";

export const useCounter = () => {
  const [value, setValue] = useState(0);
  const counterRef = useRef(0);

  const add = useCallback(() => {
    counterRef.current += 1;
    setValue(counterRef.current);
  }, []);

  return [value, add];
};
