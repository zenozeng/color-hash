var ColorHash = require('../lib/color-hash');
var assert = require('assert');

describe('ColorHash', function() {

    describe('#HSL', function() {
        it('should return hash in HSL', function() {
            var colorHash = new ColorHash();
            assert.deepEqual(colorHash.hsl(''), [0, 0.5, 0.5]);
        });
    });

    describe('#RGB', function() {
        it('should return the hash in rgb', function() {
            var colorHash = new ColorHash();
            assert.deepEqual(colorHash.rgb(''), [191, 64, 64]);
        });
    });

    describe('#HEX', function() {
        it('should return the hash in hex', function() {
            var colorHash = new ColorHash();
            assert.equal(colorHash.hex(''), '#bf4040');
        });
    });

});
