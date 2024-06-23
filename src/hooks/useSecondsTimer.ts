import { waitNextSecond } from "@utils/waitNextSecond";
import { useCallback, useEffect, useState } from "react";

export function useSecondsTimer(mod: number = 60, lazy: boolean = true) {
  const [seconds, setSeconds] = useState(new Date().getSeconds());
  const [running, setRunning] = useState(lazy);

  const start = useCallback(() => {
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) {
      return;
    }
    let executing = true;
    async function init() {
      let counter = new Date().getSeconds();
      while (executing) {
        await waitNextSecond();
        counter = (counter + 1) % mod;
        setSeconds(counter);
      }
    }
    init();
    return () => {
      executing = false;
    };
  }, [mod, running]);

  return {
    seconds,
    running,
    start,
    stop,
  };
}