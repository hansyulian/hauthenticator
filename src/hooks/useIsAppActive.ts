import { useEffect, useState } from "react";
import { AppState } from "react-native";

export const useIsAppActive = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const listener = AppState.addEventListener('change', (state) => {
      setIsActive(state === 'active');
    })
    return () => listener.remove();
  }, []);

  return isActive;
}