export function base64ToString(base64String: string) {
  const buffer = Buffer.from(base64String, "base64");
  return buffer.toString("utf-8");
}
