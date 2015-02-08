var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var HSL2RGB = ColorHash.__get__('HSL2RGB');
var assert = require('assert');

// test examples from wiki
// http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4

describe('HSL2RGB', function() {
    it('should return correct RGB of the given HSL', function() {
        assert.deepEqual(HSL2RGB(0, 1, 0.5), [255, 0, 0]);
        assert.deepEqual(HSL2RGB(120, 1, 0.75), [128, 255, 128]);
        assert.deepEqual(HSL2RGB(240, 1, 0.25), [0, 0, 128]);
    });
});
