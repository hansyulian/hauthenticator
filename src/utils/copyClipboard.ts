import * as Clipboard from "expo-clipboard";

export function copyClipboard(value: string) {
  return Clipboard.setStringAsync(value);
}
