const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"; // Base32 character set

export function uint8ArrayToBase32(uint8Array: Uint8Array) {
  const base32Array = [];
  let bits = 0;
  let bitsCount = 0;

  for (let i = 0; i < uint8Array.length; i++) {
    bits = (bits << 8) | uint8Array[i];
    bitsCount += 8;

    while (bitsCount >= 5) {
      const index = (bits >>> (bitsCount - 5)) & 31;
      base32Array.push(base32Chars[index]);
      bitsCount -= 5;
    }
  }

  if (bitsCount > 0) {
    const index = (bits << (5 - bitsCount)) & 31;
    base32Array.push(base32Chars[index]);
  }

  return base32Array.join("");
}