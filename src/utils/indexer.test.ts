import { indexer } from "./indexer";

describe("Utils: indexer", () => {
  const data = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
    { id: "3", name: "Doe" },
  ];

  it("1. should index data by the specified key", () => {
    const key = "id";
    const result = indexer(data, key);

    expect(result).toEqual({
      "1": { id: "1", name: "John" },
      "2": { id: "2", name: "Jane" },
      "3": { id: "3", name: "Doe" },
    });
  });

  it("2. should handle empty data array", () => {
    const key = "id";
    const result = indexer([], key);

    expect(result).toEqual({});
  });
});
