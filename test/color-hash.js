var assert = require('assert');
var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var HSL2RGB = ColorHash.__get__('HSL2RGB');
var RGB2HEX = ColorHash.__get__('RGB2HEX');

describe('ColorHash', function() {

    describe('#Lightness & Saturation', function() {

        it('should return the hash color based on default lightness and saturation', function() {
            var colorHash = new ColorHash();
            var hsl = colorHash.hsl('');
            hsl.shift();
            assert.deepEqual(hsl, [0.35, 0.35]);
        });

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
        var customHash = function(str) {
            var hash = 0;
            for(var i = 0; i < str.length; i++) {
                hash += str.charCodeAt(i);
            }
            return hash;
        };
        var colorHash = new ColorHash({hash: customHash});
        var hsl = [customHash('abc') % 359, 0.35, 0.35];
        var rgb = HSL2RGB(hsl[0], hsl[1], hsl[2]);
        var hex = RGB2HEX(rgb);

        it('#hsl: should return the hsl color based on the given hash function', function() {
            assert.deepEqual(colorHash.hsl('abc'), hsl);
        });
        it('#rgb: should return the rgb color based on the given hash function', function() {
            assert.deepEqual(colorHash.rgb('abc'), rgb);
        });
        it('#hex: should return the hex color based on the given hash function', function() {
            assert.deepEqual(colorHash.hex('abc'), hex);
        });
    });

});
