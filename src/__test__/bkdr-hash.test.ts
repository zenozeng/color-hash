import { BKDRHash } from "../bkdr-hash";

describe("BKDRHash", () => {
  it("should return the same value for the same string", () => {
    expect(BKDRHash("abc")).toEqual(BKDRHash("abc"));
  });

  it("should return different value for different string", () => {
    expect(BKDRHash("abc")).not.toEqual(BKDRHash("hij"));
  });

  it("should work even if the string is very long", () => {
    var longstr = "";
    for (var i = 0; i < 10 * 1000; i++) {
      longstr += "Hello World.";
    }
    var hash = BKDRHash(longstr);
    expect(hash).not.toEqual(Infinity);
    expect(hash).not.toEqual(0);
  });

  it("should return different value for different long string", () => {
    var longstr = "";
    for (var i = 0; i < 10 * 1000; i++) {
      longstr += "Hello World.";
    }
    var hash1 = BKDRHash(longstr);
    var hash2 = BKDRHash(longstr.substring(0, longstr.length - 1) + "x");
    expect(hash1).not.toEqual(hash2);
  });
});
