import BKDRHash from './lib/bkdr-hash.ts';
import { Sha256ToInt } from './lib/sha256.ts';
import { RGB2HEX, HSL2RGB } from './lib/colors.ts';

class ColorHash {

    L: number[];
    S: number[];
    hueRanges: {max: number, min: number}[]
    hash: (str: string) => number;

    constructor(options: {
        lightness?: number | number[],
        saturation?: number | number[],
        hue?: number | {max: number, min: number} | {max: number, min: number}[],
        hash?: string | ((str: string) => number);
    } = {}) {
        const [L, S] = [options.lightness, options.saturation].map(function(param) {
            param = param !== undefined ? param : [0.35, 0.5, 0.65]; // note that 3 is a prime
            return Array.isArray(param) ? param.concat() : [param];
        });
    
        this.L = L;
        this.S = S;
    
        if (typeof options.hue === 'number') {
            options.hue = {min: options.hue, max: options.hue};
        }
        if (typeof options.hue === 'object' && !Array.isArray(options.hue)) {
            options.hue = [options.hue];
        }
        if (typeof options.hue === 'undefined') {
            options.hue = [];
        }
        this.hueRanges = options.hue.map(function (range) {
            return {
                min: typeof range.min === 'undefined' ? 0 : range.min,
                max: typeof range.max === 'undefined' ? 360: range.max
            };
        });
    
        this.hash = Sha256ToInt; // Default hash function
        if (typeof options.hash === 'function') {
            this.hash = options.hash;
        } 
        if (options.hash === 'bkdr') {
            this.hash = BKDRHash;
        }
    }

    /**
     * Returns the hash in [h, s, l].
     * Note that H ∈ [0, 360); S ∈ [0, 1]; L ∈ [0, 1];
     *
     * @param {String} str string to hash
     * @returns {Array} [h, s, l]
     */
    hsl(str: string): [number, number, number] {
        var H, S, L;
        var hash = this.hash(str);
        var hueResolution = 727; // note that 727 is a prime
    
        if (this.hueRanges.length) {
            const range = this.hueRanges[hash % this.hueRanges.length];
            H = ((hash / this.hueRanges.length) % hueResolution) * (range.max - range.min) / hueResolution + range.min;
        } else {
            H = hash % 359; // note that 359 is a prime
        }
        hash = Math.ceil(hash / 360);
        S = this.S[hash % this.S.length];
        hash = Math.ceil(hash / this.S.length);
        L = this.L[hash % this.L.length];
    
        return [H, S, L];
    }


    /**
     * Returns the hash in [r, g, b].
     * Note that R, G, B ∈ [0, 255]
     *
     * @param {String} str string to hash
     * @returns {Array} [r, g, b]
     */
    rgb(str: string) {
        var hsl = this.hsl(str);
        return HSL2RGB.apply(this, hsl);
    }

    /**
     * Returns the hash in hex
     *
     * @param {String} str string to hash
     * @returns {String} hex with #
     */
    hex(str: string) {
        var rgb = this.rgb(str);
        return RGB2HEX(rgb);
    }

}



export default ColorHash;
