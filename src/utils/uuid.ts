import rnUuid from "react-native-uuid";

export function uuid() {
  return rnUuid.v4() as string;
}
