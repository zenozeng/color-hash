var assert = require('assert');
var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var stringHash = require('string-hash');
var HSL2RGB = ColorHash.__get__('HSL2RGB');
var RGB2HEX = ColorHash.__get__('RGB2HEX');

function assertHueWithinRange(minH, maxH, options) {
    options = options || {};
    options.hash = stringHash; // This hash function spreads its results more

    function hueOf(s) {
        var colorHash = new ColorHash(options);
        var hsl = colorHash.hsl(s);
        return hsl[0];
    }

    var min = 1000;
    var max = -1000;
    var iterations = 10*(maxH-minH+1);
    var hue;
    for (var i = 0; i < iterations; i++) {
        hue = hueOf('This is some padding, and then a counter: ' + i);
        min = Math.min(min, hue);
        max = Math.max(max, hue);
        assert.ok(hue >= 0 || hue < 360, '{minH: ' + minH + ', maxH: ' + maxH + '} hue=' + hue + ' is outside parameters');
    }
    assert.equal(Math.round(min), minH, '{minH: ' + minH + ', maxH: ' + maxH + '} actual min=' + min);
    assert.equal(Math.round(max), maxH, '{minH: ' + minH + ', maxH: ' + maxH + '} actual max=' + max);
}

describe('ColorHash', function() {

    describe('#Hue', function() {
        it('should return the hash color based on default hue', function() {
            assertHueWithinRange(0, 358); // hash % 359 means maximum 358
        });

        it('should return the hash color based on same minH, maxH', function() {
            assertHueWithinRange(10, 10, {minH: 10, maxH: 10});
        });

        it('should return the hash color based on the given hue {min, max}', function() {
            for (var minH = 0; minH < 361; minH += 60) {
                for (var maxH = minH + 1; maxH < 361; maxH += 60) {
                    assertHueWithinRange(minH, maxH, {
                        minH: minH,
                        maxH: maxH
                    });
                }
            }
        });

        it('should have default value for minH if only maxH is set', function() {
            assertHueWithinRange(0, 10, {maxH: 10});
        });

        it('should have default value for maxH if only minH is set', function() {
            assertHueWithinRange(350, 360, {minH: 350});
        });
    });

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
