import { getEnrolledLevelAsync } from "expo-local-authentication"

export async function checkDeviceAuthentication() {
  return getEnrolledLevelAsync();
}