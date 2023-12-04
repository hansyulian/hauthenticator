export function stringToBase64(stringValue: string) {
  const buffer = Buffer.from(stringValue, "utf-8");
  return buffer.toString("base64");
}
