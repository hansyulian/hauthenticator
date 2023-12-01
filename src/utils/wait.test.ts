import { wait } from "./wait";

describe("Utils: wait", () => {
  it("1. should wait for the specified milliseconds", async () => {
    jest.useFakeTimers();

    const waitPromise = wait(1000); // Wait for 1000 milliseconds (1 second)

    jest.advanceTimersByTime(1000); // Advance time by 500 milliseconds (half of the specified wait time)

    // Now, the promise should have resolved
    await expect(waitPromise).resolves.toBeUndefined();

    jest.useRealTimers(); // Restore real timers after the test
  });
  it("2. should wait for the specified milliseconds", async () => {
    jest.useFakeTimers();

    const waitPromise = wait(2000); // Wait for 1000 milliseconds (1 second)

    jest.advanceTimersByTime(2000); // Advance time by 500 milliseconds (half of the specified wait time)

    // Now, the promise should have resolved
    await expect(waitPromise).resolves.toBeUndefined();

    jest.useRealTimers(); // Restore real timers after the test
  });
});
