import { wait } from "./wait";

export async function waitNextMinute() {
  const now = new Date();
  return wait(60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds());
}
