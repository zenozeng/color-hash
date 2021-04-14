import {assertNotEquals} from 'https://deno.land/std@0.93.0/testing/asserts.ts';
import {Sha256ToInt} from './sha256.ts';

Deno.test('sha256 test', () => {
    // See also: https://github.com/zenozeng/color-hash/issues/30
    assertNotEquals(Sha256ToInt('2018-06-14T17'), Sha256ToInt('2018-06-15T09'));

    // See also: https://github.com/zenozeng/color-hash/issues/27
    assertNotEquals(Sha256ToInt('myView1'), Sha256ToInt('myView2'))
})