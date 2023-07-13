import * as Clipboard from 'expo-clipboard';

export async function pasteClipboard() {
  return Clipboard.getStringAsync();
}