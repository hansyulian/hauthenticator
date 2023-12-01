import { base32ToUint8Array } from "./base32ToUint8Array";
import { uint8ArrayToBase32 } from "./uint8ArrayToBase32";

describe("Utils: uint8ArrayToBase32", () => {
  it("1. should convert Uint8Array to Base32", () => {
    const uint8Array = new Uint8Array([107, 187, 73, 29, 179, 92, 118, 38]);
    const expectedBase32 = "NO5USHNTLR3CM";

    const result = uint8ArrayToBase32(uint8Array);

    expect(result).toEqual(expectedBase32);
  });

  it("2. should handle empty Uint8Array", () => {
    const uint8Array = new Uint8Array([]);
    const expectedBase32 = "";

    const result = uint8ArrayToBase32(uint8Array);

    expect(result).toEqual(expectedBase32);
  });

  it("3. should handle Uint8Array with one element", () => {
    const uint8Array = new Uint8Array([42]);
    const expectedBase32 = "FI";

    const result = uint8ArrayToBase32(uint8Array);

    expect(result).toEqual(expectedBase32);
  });

  it("4. should handle Uint8Array with multiple elements", () => {
    const uint8Array = new Uint8Array([1, 2, 3, 4, 5]);
    const expectedBase32 = "AEBAGBAF";

    const result = uint8ArrayToBase32(uint8Array);

    expect(result).toEqual(expectedBase32);
  });


  it("5. should be able to work well with the uint8ArrayToBase32", () => {
    const base32String = "KFVHG23MOJ6Q";
    const uint8Array = base32ToUint8Array(base32String);
    const returnedString = uint8ArrayToBase32(uint8Array);
    expect(returnedString).toEqual(base32String);
  })
  it("6. should be able to work well with the uint8ArrayToBase32", () => {
    const uint8Array = new Uint8Array([81, 106, 115, 107, 108, 114, 125]);
    const base32String = uint8ArrayToBase32(uint8Array);
    const returnedUint8Array = base32ToUint8Array(base32String);
    expect(returnedUint8Array).toEqual(uint8Array);
  })
  // Add more it cases as needed
});
