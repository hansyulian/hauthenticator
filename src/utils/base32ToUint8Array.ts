
const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32Lookup: { [key: string]: number } = {};
for (let i = 0; i < base32Chars.length; i++) {
  base32Lookup[base32Chars[i]] = i;
}

export function base32ToUint8Array(base32String: string) {

  // Create a lookup table for decoding Base32 characters

  // Remove any padding characters
  base32String = base32String.replace(/=+$/, "");

  // Convert Base32 string to binary string
  let binaryString = "";
  for (let i = 0; i < base32String.length; i++) {
    const char = base32String.charAt(i).toUpperCase();
    binaryString += ("00000" + base32Lookup[char].toString(2)).slice(-5);
  }

  // Convert binary string to Uint8Array
  const uint8Array = new Uint8Array(binaryString.length / 8);
  for (let i = 0; i < binaryString.length; i += 8) {
    const byte = binaryString.slice(i, i + 8);
    uint8Array[i / 8] = parseInt(byte, 2);
  }

  return uint8Array;
}
