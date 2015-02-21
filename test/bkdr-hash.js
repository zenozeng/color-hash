var BKDRHash = require('../lib/bkdr-hash.js');
var assert = require('assert');

describe('BKDRHash', function() {
    it('should return the BKDRHash of the given string', function() {
        assert.equal(BKDRHash('abc'), 1677554);
        assert.equal(BKDRHash('hij'), 1798605);
    });

    it('should work even if the string is very long', function() {
        var longstr = '';
        for(var i = 0; i < 10 * 1000; i++) {
            longstr += "Hello World.";
        };
        var hash = BKDRHash(longstr);
        assert.notEqual(hash, Infinity);
        assert.notEqual(hash, 0);
    });

    it('should return different value for different long string', function() {
        var longstr = '';
        for(var i = 0; i < 10 * 1000; i++) {
            longstr += "Hello World.";
        };
        var hash1 = BKDRHash(longstr);
        var hash2 = BKDRHash(longstr.substring(0, longstr.length - 1) + 'x');
        assert.notEqual(hash1, hash2);
    });
});
