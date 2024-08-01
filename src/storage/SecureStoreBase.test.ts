import * as SecureStore from "expo-secure-store";
import { resetMocks } from "~/utils/tests/resetMocks";

import { SecureStoreBase } from "./SecureStoreBase";

type TestStructure = {
  defaultValue: string;
  newValue?: string;
};

describe("Storage: SecureStoreBase", () => {
  const mockKey = "testKey";
  const mockDefaultValues = { defaultValue: "mockDefaultValue" };

  beforeEach(() => {
    // Clear mock calls between tests
    resetMocks();
  });

  it("1. set method should call AsyncStorage.setItem with the correct arguments", async () => {
    const secureStore = new SecureStoreBase<TestStructure>(mockKey, mockDefaultValues);
    const mockValues = { newValue: "mockNewValue" };

    await secureStore.set(mockValues);

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      mockKey,
      JSON.stringify({ ...mockDefaultValues, ...mockValues }),
      {}
    );
  });

  it("2. get method should call AsyncStorage.getItem with the correct arguments", async () => {
    const secureStore = new SecureStoreBase<TestStructure>(mockKey, mockDefaultValues);

    await secureStore.get();

    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(mockKey, {});
  });

  it("3. get method should return default values if AsyncStorage.getItem returns null", async () => {
    const secureStore = new SecureStoreBase<TestStructure>(mockKey, mockDefaultValues);

    const result = await secureStore.get();

    expect(result).toEqual({ ...mockDefaultValues });
  });

  it("4. get method should return merged values if AsyncStorage.getItem returns non-null", async () => {
    const secureStore = new SecureStoreBase<TestStructure>(mockKey, mockDefaultValues);
    const mockStoredValues = { newValue: "mockStoredValue" };
    await secureStore.set(mockStoredValues);
    const result = await secureStore.get();

    expect(result).toEqual({ ...mockDefaultValues, ...mockStoredValues });
  });
});
