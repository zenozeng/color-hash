import {assertEquals} from 'https://deno.land/std@0.93.0/testing/asserts.ts';
import {HSL2RGB, RGB2HEX} from './colors.ts';

Deno.test('HSL2RGB should return correct RGB of the given HSL', () => {
    // test examples from http://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4
    assertEquals(HSL2RGB(0, 1, 0.5), [255, 0, 0]);
    assertEquals(HSL2RGB(120, 1, 0.75), [128, 255, 128]);
    assertEquals(HSL2RGB(240, 1, 0.25), [0, 0, 128]);

    // test example generated using gpick
    assertEquals(HSL2RGB(330, 1, 0.75), [255, 128, 191]);
})

Deno.test('RGB2HEX: should return hex for rgb', () => {
    assertEquals(RGB2HEX([255, 64, 0]), '#ff4000');
})

Deno.test('RGB2HEX should return string which length is 7 for even samll rgb values', () => {
    assertEquals(RGB2HEX([1, 15, 16]), '#010f10');
})
