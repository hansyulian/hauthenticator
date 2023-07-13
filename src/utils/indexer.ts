export function indexer<DataType extends Record<string, T>, T>(data: DataType[], key: keyof DataType): Record<string, DataType> {
  const result: Partial<Record<string, DataType>> = {};
  for (const record of data) {
    result[record[key] as string] = record;
  }
  return result as Record<string, DataType>;
}