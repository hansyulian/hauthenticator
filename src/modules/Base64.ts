
export const Base64 = {
  encode,
  decode,
};

function encode(stringValue: string) {
  const buffer = Buffer.from(stringValue, "utf-8");
  return buffer.toString("base64");
}

function decode(base64String: string) {
  const buffer = Buffer.from(base64String, "base64");
  return buffer.toString("utf-8");
}