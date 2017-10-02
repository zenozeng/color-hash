var assert = require('assert');
var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var stringHash = require('string-hash');
var HSL2RGB = ColorHash.__get__('HSL2RGB');
var RGB2HEX = ColorHash.__get__('RGB2HEX');

function assertHueWithinRange(min, max, options) {
    options = options || {};
    options.hash = stringHash; // This hash function spreads its results more

    function hueOf(s) {
        var colorHash = new ColorHash(options);
        var hsl = colorHash.hsl(s);
        return hsl[0];
    }

    var minSeen = 1000;
    var maxSeen = -1000;
    var iterations = 10*(max-min+1);
    var hue;
    for (var i = 0; i < iterations; i++) {
        hue = hueOf('This is some padding, and then a counter: ' + i);
        minSeen = Math.min(minSeen, hue);
        maxSeen = Math.max(maxSeen, hue);
        assert.ok(hue >= 0 || hue < 360, '{min: ' + min + ', max: ' + max + '} hue=' + hue + ' is outside parameters');
    }
    assert.equal(Math.round(minSeen), min, '{min: ' + min + ', max: ' + max + '} actual minSeen=' + minSeen);
    assert.equal(Math.round(maxSeen), max, '{min: ' + min + ', max: ' + max + '} actual maxSeen=' + maxSeen);
}

describe('ColorHash', function() {

    describe('#Hue', function() {
        it('should return the hash color based on default hue', function() {
            assertHueWithinRange(0, 358); // hash % 359 means maximum 358
        });

        it('should return the hash color based on numeric hue', function() {
            assertHueWithinRange(10, 10, {hue: 10});
        });

        it('should return the hash color based on same min, max', function() {
            assertHueWithinRange(10, 10, {hue: {min: 10, max: 10}});
        });

        it('should return the hash color based on the given hue {min, max}', function() {
            for (var min = 0; min < 361; min += 60) {
                for (var max = min + 1; max < 361; max += 60) {
                    assertHueWithinRange(min, max, {
                        hue: {
                            min: min,
                            max: max
                        }
                    });
                }
            }
        });

        it('should have default value for min if only max is set', function() {
            assertHueWithinRange(0, 10, {hue: {max: 10}});
        });

        it('should have default value for max if only min is set', function() {
            assertHueWithinRange(350, 360, {hue: {min: 350}});
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
