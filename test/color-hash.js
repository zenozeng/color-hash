var rewire = require("rewire");
var ColorHash = rewire('../lib/color-hash');

var BKDRHash = ColorHash.__get__('BKDRHash');

["s", "ssss"].forEach(function(str) {
    console.log(str, BKDRHash(str) % 359);
});

var hash = new ColorHash({
    saturation: [0.4, 0.6],
    lightness: 0.5
});
console.log(hash('hello world'));
