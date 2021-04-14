import {assertEquals} from 'https://deno.land/std@0.93.0/testing/asserts.ts';

import {HSL2RGB, RGB2HEX} from './lib/colors.ts';


var assert = require('assert');
var rewire = require('rewire');
var ColorHash = rewire('../lib/color-hash');
var stringHash = require('string-hash');

function assertHueWithinRange(options, expectedRange) {
    return assertHueWithinRanges(options, [expectedRange]);
}

function assertHueWithinRanges(options, ranges) {
    options = options || {};
    if (typeof ranges === 'undefined' || !ranges.length || !ranges[0]) {
        ranges = [{}];
    }
    options.hash = stringHash; // This hash function spreads its results more

    function hueOf(s: string) {
        var colorHash = new ColorHash(options);
        var hsl = colorHash.hsl(s);
        return hsl[0];
    }

    ranges = ranges.map(function (range: {min: number, max: number}) {
        return {
            min: range.min,
            max: range.max,
            size: range.max - range.min,
            minSeen: 1000,
            maxSeen: -1000
        };
    });

    var totalSize = ranges.reduce(function (sum, range) {
        return sum + range.size;
    }, 0);

    var iterations = 10 * (totalSize + 1);
    var hue;
    for (var i = 0; i < iterations; i++) {
        hue = hueOf('This is some padding, and then a counter: ' + i);
        assert.ok(hue >= 0 || hue < 360, JSON.stringify(ranges, null, 2) + ' hue=' + hue + ' is outside parameters');
        var withinAtLeastOneRange = ranges.reduce(function(withinAnyRangeYet, range) {
            var withinThisRange = hue >= range.min && hue <= range.max;
            if (withinThisRange) {
                range.minSeen = Math.min(range.minSeen, hue);
                range.maxSeen = Math.max(range.maxSeen, hue);
            }
            return withinAnyRangeYet || withinThisRange;
        }, false);
        assert.ok(withinAtLeastOneRange, JSON.stringify(ranges, null, 2) + ' hue=' + hue + ' is not within any range.');
    }
    ranges.forEach(function(range) {
        assert.equal(Math.round(range.minSeen), range.min, '{min: ' + range.min + ', max: ' + range.max + '} actual minSeen=' + range.minSeen);
        assert.equal(Math.round(range.maxSeen), range.max, '{min: ' + range.min + ', max: ' + range.max + '} actual maxSeen=' + range.maxSeen);
    });
}

describe('ColorHash', function () {

    describe('#Hue', function () {
        it('should return the hash color based on default hue', function () {
            assertHueWithinRange(undefined, {min: 0, max: 358}); // hash % 359 means maximum 358
        });

        it('should return the hash color based on numeric hue', function () {
            assertHueWithinRange({hue: 10}, {min: 10, max: 10});
        });

        it('should return the hash color based on same min, max', function () {
            var range = {min: 10, max: 10};
            assertHueWithinRange({hue: range}, range);
        });

        it('should return the hash color based on the given hue {min, max}', function () {
            var min, max, range;
            for (min = 0; min < 361; min += 60) {
                for (max = min + 1; max < 361; max += 60) {
                    range = {min: min, max: max};
                    assertHueWithinRange({hue: range}, range);
                }
            }
        });

        it('should have default value for min if only max is set', function () {
            assertHueWithinRange({hue: {max: 10}}, {min: 0, max: 10});
        });

        it('should have default value for max if only min is set', function () {
            assertHueWithinRange({hue: {min: 350}}, {min: 350, max: 360});
        });

        it('should return the hash color based on different hue ranges', function () {
            var ranges = [
                {min: 30, max: 90},
                {min: 180, max: 210},
                {min: 270, max: 285}
            ];
            assertHueWithinRanges({hue: ranges}, ranges);
        });
    });

    describe('#Lightness & Saturation', function () {

        it('should return the hash color based on default lightness and saturation', function () {
            var colorHash = new ColorHash();
            var hsl = colorHash.hsl('');
            hsl.shift();
            assert.deepEqual(hsl, [0.35, 0.35]);
        });

        it('should return the hash color based on the given lightness and saturation', function () {
            var colorHash = new ColorHash({lightness: 0.5, saturation: 0.5});
            var hsl = colorHash.hsl('');
            assert.deepEqual([hsl[1], hsl[2]], [0.5, 0.5]);
        });

        it('should return the hash color based on the given lightness array and saturation array', function () {
            var colorHash = new ColorHash({
                lightness: [0.9, 1],
                saturation: [0.9, 1]
            });
            var hsl = colorHash.hsl('');
            assert.deepEqual([hsl[1], hsl[2]], [0.9, 0.9]);
        });
    });

    describe('#CustomHash', function () {
        var customHash = function (str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash += str.charCodeAt(i);
            }
            return hash;
        };
        var colorHash = new ColorHash({hash: customHash});
        var hsl = [customHash('abc') % 359, 0.35, 0.35];
        var rgb = HSL2RGB(hsl[0], hsl[1], hsl[2]);
        var hex = RGB2HEX(rgb);

        it('#hsl: should return the hsl color based on the given hash function', function () {
            assert.deepEqual(colorHash.hsl('abc'), hsl);
        });
        it('#rgb: should return the rgb color based on the given hash function', function () {
            assert.deepEqual(colorHash.rgb('abc'), rgb);
        });
        it('#hex: should return the hex color based on the given hash function', function () {
            assert.deepEqual(colorHash.hex('abc'), hex);
        });
    });

});
