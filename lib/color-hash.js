/**
 * BKDR Hash
 * @param {String} str string to hash
 * @returns {Number}
 */
var BKDRHash = function(str) {
    var seed = 131;
    var hash = 0;
    for(var i = 0; i < str.length; i++) {
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};

/**
 * Color Hash Class
 *
 * @class
 */
var ColorHash = function(options) {
    options = options || {};

    if(options.colors) {
        this.pool = options.colors.concat(); // copy colors
    }

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    this.L = options.lightness || 0.5;
    this.S = options.saturation || 0.5;
    this.L = isArray(this.L) ? this.L.concat() : [this.L];
    this.S = isArray(this.S) ? this.S.concat() : [this.S];

    this.hash = options.hash || BKDRHash;
};

/**
 * Returns the hash color from pool
 * @param {String} str string to hash
 */
ColorHash.prototype.fromPool = function(str) {
    var hash = this.hash(str);
    if(this.pool) {
        return this.pool[hash % this.pool.length];
    } else {
        throw new Error('options.colors undefined');
    }
};

/**
 * Returns the hash in [h, s, l]
 * @param {String} str string to hash
 * @returns {Array} [h, s, l]
 */
ColorHash.prototype.hsl = function(str) {
    var H, S, L;
    var hash = this.hash(str);

    H = hash % 359; // note that 359 is a prime
    hash = parseInt(hash / 360);
    S = this.S[hash % this.S.length];
    hash = parseInt(hash / this.S.length);
    L = this.L[hash % this.L.length];

    return [H, S, L];
};

/**
 * Returns the hash in [r, g, b]
 * @param {String} str string to hash
 * @returns {Array} [r, g, b]
 */
ColorHash.prototype.rgb = function(str) {
    var hsl = this.hsl(str);
    // TODO: convert hsl to rgb
    var rgb;
    return rgb;
};

/**
 * Returns the hash in hex
 * @param {String} str string to hash
 * @returns {String} hex with #
 */
ColorHash.prototype.hex = function(str) {
    var rgb = this.rgb(str);
    return '#' + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
};

module.exports = ColorHash;
