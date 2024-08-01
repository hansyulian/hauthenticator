import AsyncStorage from "@react-native-async-storage/async-storage";

export class BasicStoreBase<T extends object> {
  public key: string;
  public defaultValues: T;

  constructor(key: string, defaultValues: T) {
    this.key = key;
    this.defaultValues = defaultValues;
  }

  async set(values: Partial<T>) {
    const storedValues = this.nativeGet();
    const setValues: T = {
      ...this.defaultValues,
      ...storedValues,
      ...values,
    };
    return this.nativeSet(setValues);
  }

  async get(): Promise<T> {
    const readValues: T | null = await this.nativeGet();
    if (!readValues) {
      return {
        ...this.defaultValues,
      };
    }
    return {
      ...this.defaultValues,
      ...readValues,
    };
  }

  private nativeSet(value: T) {
    return AsyncStorage.setItem(this.key, JSON.stringify(value));
  }

  private async nativeGet(): Promise<T | null> {
    const result = await AsyncStorage.getItem(this.key);
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  }
}
