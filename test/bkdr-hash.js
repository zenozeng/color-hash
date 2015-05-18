var BKDRHash = require('../lib/bkdr-hash.js');
var assert = require('assert');

describe('BKDRHash', function() {
    it('should return different value for different string', function() {
        assert.notEqual(BKDRHash('abc'), BKDRHash('hij'));
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
