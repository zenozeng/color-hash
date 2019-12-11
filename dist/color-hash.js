import { BKDRHash } from "./bkdr-hash";
/**
 * Convert RGB Array to HEX
 *
 * @param {Array} RGBArray - [R, G, B]
 * @returns {String} 6 digits hex starting with #
 */
function RGB2HEX(RGBArray) {
    var hex = "#";
    RGBArray.forEach(function (value) {
        if (value < 16) {
            hex += 0;
        }
        hex += value.toString(16);
    });
    return hex;
}
export { RGB2HEX as testForRGB2HEX };
var paramToColor = function (p, q) { return function (color) {
    if (color < 0) {
        color++;
    }
    if (color > 1) {
        color--;
    }
    if (color < 1 / 6) {
        color = p + (q - p) * 6 * color;
    }
    else if (color < 0.5) {
        color = q;
    }
    else if (color < 2 / 3) {
        color = p + (q - p) * 6 * (2 / 3 - color);
    }
    else {
        color = p;
    }
    return Math.round(color * 255);
}; };
/**
 * Convert HSL to RGB
 *
 * @see {@link http://zh.wikipedia.org/wiki/HSL和HSV色彩空间} for further information.
 * @param {Number} H Hue ∈ [0, 360)
 * @param {Number} S Saturation ∈ [0, 1]
 * @param {Number} L Lightness ∈ [0, 1]
 * @returns {Array} R, G, B ∈ [0, 255]
 */
function HSL2RGB(H, S, L) {
    H /= 360;
    var q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    var p = 2 * L - q;
    var partial = paramToColor(p, q);
    return [partial(H + 1 / 3), partial(H), partial(H - 1 / 3)];
}
export { HSL2RGB as testFroHSL2RGB };
/**
 * Color Hash Class
 *
 * @class
 */
var ColorHash = /** @class */ (function () {
    function ColorHash(options) {
        if (options === void 0) { options = {}; }
        var _a, _b, _c;
        var LS = [(_a = options.lightness, (_a !== null && _a !== void 0 ? _a : [0.35, 0.5, 0.65])), (_b = options.saturation, (_b !== null && _b !== void 0 ? _b : [0.35, 0.5, 0.65]))].map(function (param) {
            return Array.isArray(param) ? param.concat() : [param];
        });
        this.L = LS[0];
        this.S = LS[1];
        if (typeof options.hue === "number") {
            options.hue = { min: options.hue, max: options.hue };
        }
        if (typeof options.hue === "object" && !Array.isArray(options.hue)) {
            options.hue = [options.hue];
        }
        if (typeof options.hue === "undefined") {
            options.hue = [];
        }
        this.hueRanges = options.hue.map(function (range) {
            return {
                min: typeof range.min === "undefined" ? 0 : range.min,
                max: typeof range.max === "undefined" ? 360 : range.max
            };
        });
        this.hash = (_c = options.hash, (_c !== null && _c !== void 0 ? _c : BKDRHash));
    }
    ColorHash.prototype.getHue = function (hash) {
        if (this.hueRanges.length > 0) {
            var range = this.hueRanges[hash % this.hueRanges.length];
            var hueResolution = 727; // note that 727 is a prime
            return (((hash / this.hueRanges.length) % hueResolution) *
                (range.max - range.min)) /
                hueResolution +
                range.min;
        }
        else {
            return hash % 359; // note that 359 is a prime
        }
    };
    /**
     * Returns the hash in [h, s, l].
     * Note that H ∈ [0, 360); S ∈ [0, 1]; L ∈ [0, 1];
     *
     * @param {String} str string to hash
     * @returns {Array} [h, s, l]
     */
    ColorHash.prototype.hsl = function (str) {
        var hash = this.hash(str);
        var H = this.getHue(hash);
        hash = hash / 360;
        var S = this.S[Math.floor(hash % this.S.length)];
        hash = hash / this.S.length;
        var L = this.L[Math.floor(hash % this.L.length)];
        return [H, S, L];
    };
    /**
     * Returns the hash in [r, g, b].
     * Note that R, G, B ∈ [0, 255]
     *
     * @param {String} str string to hash
     * @returns {Array} [r, g, b]
     */
    ColorHash.prototype.rgb = function (str) {
        var hsl = this.hsl(str);
        // console.log('hsl', hsl)
        return HSL2RGB.apply(void 0, hsl);
    };
    /**
     * Returns the hash in hex
     *
     * @param {String} str string to hash
     * @returns {String} hex with #
     */
    ColorHash.prototype.hex = function (str) {
        var rgb = this.rgb(str);
        return RGB2HEX(rgb);
    };
    return ColorHash;
}());
export default ColorHash;
//# sourceMappingURL=color-hash.js.map