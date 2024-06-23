import * as SecureStore from "expo-secure-store";

export class SecureStoreBase<T extends object> {
  public key: string;
  public defaultValues: T;
  public options: SecureStore.SecureStoreOptions;

  constructor(key: string, defaultValues: T, options: SecureStore.SecureStoreOptions = {}) {
    this.key = key;
    this.defaultValues = defaultValues;
    this.options = options;
  }

  async set(values: Partial<T>, options: SecureStore.SecureStoreOptions = {}) {
    const storedValues = await this.nativeGet(options);
    const setValues: T = {
      ...this.defaultValues,
      ...storedValues,
      ...values
    };
    return this.nativeSet(setValues, options);
  }

  async get(options: SecureStore.SecureStoreOptions = {}): Promise<T> {
    const readValues: T | null = await this.nativeGet(options);
    if (!readValues) {
      const data = {
        ...this.defaultValues,
      }
      this.nativeSet(data)
      return data;
    }
    return {
      ...this.defaultValues,
      ...readValues,
    };
  }

  private nativeSet(value: T, options: SecureStore.SecureStoreOptions = {}) {
    return SecureStore.setItemAsync(this.key, JSON.stringify(value), {
      ...this.options,
      ...options,
    });
  }

  private async nativeGet(options: SecureStore.SecureStoreOptions = {}): Promise<T | null> {
    const result = await SecureStore.getItemAsync(this.key, {
      ...this.options,
      ...options,
    });
    if (!result) {
      return null;
    }
    return JSON.parse(result);
  }
}