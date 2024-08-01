import { base32ToUint8Array } from "./base32ToUint8Array";
import { uint8ArrayToBase32 } from "./uint8ArrayToBase32";

describe("Utils: base32ToUint8Array", () => {
  it("1. should convert base32 string to Uint8Array", () => {
    const base32String = "KFVHG23MOJ6Q";
    const expectedUint8Array = new Uint8Array([81, 106, 115, 107, 108, 114, 125]);

    const result = base32ToUint8Array(base32String);

    expect(result).toEqual(expectedUint8Array);
  });

  it("2. should handle padding characters", () => {
    const base32String = "KFVHG23MOJ6Q===="; // With padding characters
    const expectedUint8Array = new Uint8Array([81, 106, 115, 107, 108, 114, 125]);

    const result = base32ToUint8Array(base32String);

    expect(result).toEqual(expectedUint8Array);
  });

  it("3. should be able to work well with the uint8ArrayToBase32", () => {
    const base32String = "KFVHG23MOJ6Q";
    const uint8Array = base32ToUint8Array(base32String);
    const returnedString = uint8ArrayToBase32(uint8Array);
    expect(returnedString).toEqual(base32String);
  });
  it("4. should be able to work well with the uint8ArrayToBase32", () => {
    const uint8Array = new Uint8Array([81, 106, 115, 107, 108, 114, 125]);
    const base32String = uint8ArrayToBase32(uint8Array);
    const returnedUint8Array = base32ToUint8Array(base32String);
    expect(returnedUint8Array).toEqual(uint8Array);
  });
  // Add more test cases as needed
});
