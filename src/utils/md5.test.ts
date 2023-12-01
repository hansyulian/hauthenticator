import { md5 } from "./md5";

describe("Utils: md5", () => {
  const data = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
    { id: "3", name: "Doe" },
  ];

  it("1. md5('Lorem ipsum')", () => {
    expect(md5("Lorem ipsum")).toStrictEqual("0956d2fbd5d5c29844a4d21ed2f76e0c");
  });
  it("1. md5('Alice Bob Charlie')", () => {
    expect(md5("Alice Bob Charlie")).toStrictEqual("a4bc256903da52d95c9bd61972926fb9");
  });
});
