import { wait } from "./wait";

export async function waitNextSecond() {
  return wait(1000 - new Date().getMilliseconds());
}
