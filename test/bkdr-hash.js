var BKDRHash = require('../lib/bkdr-hash.js');
var assert = require('assert');

describe('BKDRHash', function() {
    it('should return the BKDRHash of the given string', function() {
        assert.equal(BKDRHash('abc'), 1677554);
        assert.equal(BKDRHash('hij'), 1798605);
    });
});
