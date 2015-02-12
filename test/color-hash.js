var ColorHash = require('../lib/color-hash');
var assert = require('assert');

describe('ColorHash', function() {

    describe('#HSL', function() {
        it('should return hash in HSL', function() {
            var colorHash = new ColorHash();
            assert.deepEqual(colorHash.hsl(''), [0, 0.35, 0.35]);
        });
    });

    describe('#RGB', function() {
        it('should return the hash in rgb', function() {
            var colorHash = new ColorHash();
            assert.deepEqual(colorHash.rgb(''), [120, 58, 58]);
        });
    });

    describe('#HEX', function() {
        it('should return the hash in hex', function() {
            var colorHash = new ColorHash();
            assert.equal(colorHash.hex(''), '#783a3a');
        });
    });

});
