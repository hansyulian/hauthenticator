import { resetMocks } from "~/utils/tests/resetMocks";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { BasicStoreBase } from "./BasicStoreBase";

type TestStructure = {
  defaultValue: string;
  newValue?: string;
};

describe("Storage: BasicStoreBase", () => {
  const mockKey = "testKey";
  const mockDefaultValues = { defaultValue: "mockDefaultValue" };

  beforeEach(() => {
    // Clear mock calls between tests
    resetMocks();
  });

  it("1. set method should call AsyncStorage.setItem with the correct arguments", async () => {
    const basicStore = new BasicStoreBase<TestStructure>(mockKey, mockDefaultValues);
    const mockValues = { newValue: "mockNewValue" };

    await basicStore.set(mockValues);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      mockKey,
      JSON.stringify({ ...mockDefaultValues, ...mockValues })
    );
  });

  it("2. get method should call AsyncStorage.getItem with the correct arguments", async () => {
    const basicStore = new BasicStoreBase<TestStructure>(mockKey, mockDefaultValues);

    await basicStore.get();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(mockKey);
  });

  it("3. get method should return default values if AsyncStorage.getItem returns null", async () => {
    const basicStore = new BasicStoreBase<TestStructure>(mockKey, mockDefaultValues);

    const result = await basicStore.get();

    expect(result).toEqual({ ...mockDefaultValues });
  });

  it("4. get method should return merged values if AsyncStorage.getItem returns non-null", async () => {
    const basicStore = new BasicStoreBase<TestStructure>(mockKey, mockDefaultValues);
    const mockStoredValues = { newValue: "mockStoredValue" };
    await basicStore.set(mockStoredValues);
    const result = await basicStore.get();

    expect(result).toEqual({ ...mockDefaultValues, ...mockStoredValues });
  });
});
