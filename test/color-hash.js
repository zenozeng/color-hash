var ColorHash = require('../lib/color-hash');
var hash = new ColorHash({
    saturation: [0.4, 0.6],
    lightness: 0.5
});
console.log(hash('hello world'));
