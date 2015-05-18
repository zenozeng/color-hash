var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var HSL2RGB = ColorHash.__get__('HSL2RGB');
var RGB2HEX = ColorHash.__get__('RGB2HEX');
var assert = require('assert');

describe('HSL2RGB', function() {
    it('should return correct RGB of the given HSL', function() {
        // test examples from http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
        assert.deepEqual(HSL2RGB(0, 1, 0.5), [255, 0, 0]);
        assert.deepEqual(HSL2RGB(120, 1, 0.75), [128, 255, 128]);
        assert.deepEqual(HSL2RGB(240, 1, 0.25), [0, 0, 128]);

        // test example generated using gpick
        assert.deepEqual(HSL2RGB(330, 1, 0.75), [255, 128, 191]);
    });
});

describe('RGB2HEX', function() {
    it('should return hex for rgb', function() {
         assert.equal(RGB2HEX([255, 64, 0]), '#ff4000');
    });
    it('should return 6 digits hex for even small rgb values', function() {
        assert.equal(RGB2HEX([1, 15, 16]), '#010f10');
    });
});
