// use js for this, because the extended function on mock isn't detected in typescript
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export function resetMocks() {
  jest.clearAllMocks();
  AsyncStorage.__clearJestMock();
  SecureStore.__clearJestMock()
}