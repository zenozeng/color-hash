var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var BKDRHash = ColorHash.__get__('BKDRHash');
var assert = require('assert');

describe('BKDRHash', function() {
    it('should return the BKDRHash of the given string', function() {
        assert.equal(BKDRHash('abc'), 1677554);
        assert.equal(BKDRHash('hij'), 1798605);
    });
});
