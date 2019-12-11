import { testForRGB2HEX, testFroHSL2RGB } from "../color-hash";
describe("HSL2RGB", function () {
    it("should return correct RGB of the given HSL", function () {
        // test examples from http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
        expect(testFroHSL2RGB(0, 1, 0.5)).toEqual([255, 0, 0]);
        expect(testFroHSL2RGB(120, 1, 0.75)).toEqual([128, 255, 128]);
        expect(testFroHSL2RGB(240, 1, 0.25)).toEqual([0, 0, 128]);
        // test example generated using gpick
        expect(testFroHSL2RGB(330, 1, 0.75)).toEqual([255, 128, 191]);
    });
});
describe("RGB2HEX", function () {
    it("should return hex for rgb", function () {
        expect(testForRGB2HEX([255, 64, 0])).toEqual("#ff4000");
    });
    it("should return 6 digits hex for even small rgb values", function () {
        expect(testForRGB2HEX([1, 15, 16])).toEqual("#010f10");
    });
});
//# sourceMappingURL=color-convert.test.js.map