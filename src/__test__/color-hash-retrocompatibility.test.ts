import ColorHash from "../color-hash";

describe("retrocompatibility with original library", () => {
  const colorHash = new ColorHash();
  it("hello world", () => {
    expect(colorHash.hex("hello world")).toEqual("#ae87c5");
  });
  it("Hello World", () => {
    expect(colorHash.hex("hello world")).toEqual("#ae87c5");
  });
  it("HELLO WORLD", () => {
    expect(colorHash.hex("HELLO WORLD")).toEqual("#d2d179");
  });
  it("color-hash-ts", () => {
    expect(colorHash.hex("color-hash-ts")).toEqual("#931f3e");
  });
  it("color hash ts", () => {
    expect(colorHash.hex("color hash ts")).toEqual("#87d279");
  });
});
