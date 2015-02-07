var BKDRHash = function(str) {
    var seed = 131;
    var hash = 0;
    for(var i = 0; i < str.length; i++) {
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};

// TODO
var HSL2RGB = function(h, s, l) {
};

var RGB2HEX = function(r, g, b) {
    return r.toString(16) + g.toString(16) + b.toString(16);
};

var isArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var ColorHash = function(options) {
    if(options.colors) {
        this.pool = options.colors.concat(); // copy colors
    } else {
        this.L = options.lightness || 0.5;
        this.S = options.saturation || 0.5;
        this.L = isArray(this.L) ? this.L.concat() : [this.L];
        this.S = isArray(this.S) ? this.S.concat() : [this.S];
    }
    var M = this.pool ? options.colors.length : 360 * S.length * L.length;

    var hash = 123;

    // TODO: 这里的分布有问题
    var H = hash % 360;
    var S = hash % this.S.length;
    var L = hash % this.L.length;
};

// TODO
ColorHash.prototype.hsl = function(str) {
};

ColorHash.prototype.rgb = function(str) {
    var hsl = this.hsl(str);
    return HSL2RGB.apply(this, hsl);
};

ColorHash.prototype.hex = function(str) {
    var rgb = this.rgb(str);
    return RGB2HEX.apply(this, rgb);
};

module.exports = ColorHash;
