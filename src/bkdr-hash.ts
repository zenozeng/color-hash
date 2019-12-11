/**
 * BKDR Hash (modified version)
 *
 * @param {String} str string to hash
 * @returns {Number}
 */
export function BKDRHash(str: string): number {
  const seed = 131;
  const seed2 = 137;
  let hash = 0;
  // make hash more sensitive for short string like 'a', 'b', 'c'
  str += "x";
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER / seed2;
  for (let i = 0; i < str.length; i++) {
    if (hash > MAX_SAFE_INTEGER) {
      hash = hash / seed2;
    }
    hash = hash * seed + str.charCodeAt(i);
  }
  return hash;
}
