var rewire = require("rewire");
var ColorHash = rewire('../lib/color-hash');

var BKDRHash = ColorHash.__get__('BKDRHash');

["s", "ssss"].forEach(function(str) {
    BKDRHash(str);
});
