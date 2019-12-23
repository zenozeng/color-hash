import ColorHash from "../color-hash";

describe("long strings", () => {
  const colorHash = new ColorHash();
  it("Hello world", () => {
    expect(colorHash.hex("Hello World")).toEqual("#AE87C5");
    // expect(colorHash.hex("hello world")).toEqual("#AE87C5");
  });
});
