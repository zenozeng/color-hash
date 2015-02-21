/**
 * BKDR Hash
 *
 * @param {String} str string to hash
 * @returns {Number}
 */
var BKDRHash = function(str) {
    var seed = 131;
    var hash = 0;
    var MAX_SAFE_INTEGER = parseInt(9007199254740991 / seed / seed); // Number.MAX_SAFE_INTEGER equals  9007199254740991
    for(var i = 0; i < str.length; i++) {
        if(hash > MAX_SAFE_INTEGER) {
            hash = parseInt(hash / seed);
        }
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};

module.exports = BKDRHash;
