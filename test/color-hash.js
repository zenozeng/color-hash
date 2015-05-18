var ColorHash = require('../lib/color-hash');
var assert = require('assert');

describe('ColorHash', function() {

    describe('#Lightness & Saturation', function() {
        it('should return the hash color based on the given lightness and saturation', function() {
            var colorHash = new ColorHash({lightness: 0.5, saturation: 0.5});
            var hsl = colorHash.hsl('');
            assert.deepEqual([hsl[1], hsl[2]], [0.5, 0.5]);
        });

        it('should return the hash color based on the given lightness array and saturation array', function() {
            var colorHash = new ColorHash({
                lightness: [0.9, 1],
                saturation: [0.9, 1]
            });
            var hsl = colorHash.hsl('');
            assert.deepEqual([hsl[1], hsl[2]], [0.9, 0.9]);
        });
    });

    describe('#CustomHash', function() {
        it('should return the hash color based on the given hash function', function() {
            var customHash = function(str) {
                var hash = 0;
                for(var i = 0; i < str.length; i++) {
                    hash += str.charCodeAt(i);
                }
                return hash;
            };
            var colorHash = new ColorHash({hash: customHash});
            assert.deepEqual(colorHash.hsl('abc'), [customHash('abc') % 359, 0.35, 0.35]);
        });
    });

});
