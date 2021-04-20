import {assertNotEquals} from 'https://deno.land/std@0.93.0/testing/asserts.ts';
import BKDRHash from './bkdr-hash.ts';

Deno.test("BKDRHash should return different value for different string", () => {
    assertNotEquals(BKDRHash('abc'), BKDRHash('hij'))
})

Deno.test("BKDRHash should work for very long string", () => {
    let longstr = '';
    for(let i = 0; i < 10 * 1000; i++) {
        longstr += "Hello World.";
    }
    const hash = BKDRHash(longstr);
    assertNotEquals(hash, Infinity);
    assertNotEquals(hash, 0);

    const hash2 = BKDRHash(longstr.substring(0, longstr.length - 1));
    assertNotEquals(hash, hash2);
})