/**
 * BKDR Hash (modified version)
 *
 * @param {String} str string to hash
 * @returns {Number}
 */
const BKDRHash = function(str: string) {
    var seed = 131;
    var seed2 = 137;
    var hash = 0;
    // make hash more sensitive for short string like 'a', 'b', 'c'
    str += 'x';
    // Note: Number.MAX_SAFE_INTEGER equals 9007199254740991
    var MAX_SAFE_INTEGER = Math.floor(9007199254740991 / seed2);
    for(let i = 0; i < str.length; i++) {
        if(hash > MAX_SAFE_INTEGER) {
            hash = Math.floor(hash / seed2);
        }
        hash = hash * seed + str.charCodeAt(i);
    }
    return hash;
};

export default BKDRHash;
