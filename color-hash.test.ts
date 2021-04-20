import {assertEquals, assert} from 'https://deno.land/std@0.93.0/testing/asserts.ts';
import {generate as generateUUID} from 'https://deno.land/std@0.93.0/uuid/v4.ts';
import {HSL2RGB, RGB2HEX} from './lib/colors.ts';
import ColorHash from './mod.ts';

Deno.test("ColorHash#Hue: should return the hash color based on default hue", () => {
    const hash = new ColorHash();
    for (let i = 0; i < 100; i++) {
        const hue = hash.hsl(generateUUID())[0];
        assertEquals(hue >= 0 && hue < 359, true); // hash % 359 means max 358
    }
})

Deno.test("ColorHash#Hue: should return the hash color based on given hue value", () => {
    const hash = new ColorHash({hue: 10});
    for (let i = 0; i < 100; i++) {
        const hue = hash.hsl(generateUUID())[0];
        assertEquals(hue, 10);
    }
})

Deno.test("ColorHash#Hue: should return the hash color based on given hue range", () => {
    for (let min = 0; min < 361; min += 60) {
        for (let max = min + 1; max < 361; max += 60) {
            const hash = new ColorHash({hue: {min, max}});
            for (let i = 0; i < 100; i++) {
                const hue = hash.hsl(generateUUID())[0];
                assertEquals(hue >= min && hue < max, true);
            }
        }
    }
})

Deno.test("ColorHash#Hue: should work for multiple hue ranges", () => {
    var ranges = [
        {min: 30, max: 90},
        {min: 180, max: 210},
        {min: 270, max: 285}
    ];
    const hash = new ColorHash({hue: ranges});
    for (let i = 0; i < 100; i++) {
        const hue = hash.hsl(generateUUID())[0];
        assertEquals(ranges.some((range) => hue >= range.min && hue < range.max), true);
    }
})

Deno.test("ColorHash#LS: should return color based on given lightness and saturation", () => {
    const hash = new ColorHash({lightness: 0.5, saturation: 0.5});
    const [h, s, l] = hash.hsl(generateUUID());
    assertEquals(s, 0.5);
    assertEquals(l, 0.5);
})

Deno.test("ColorHash should return the hash color based on given lightness array and saturation array", () => {
    const hash = new ColorHash({
        lightness: [0.9, 1],
        saturation: [0.9, 1]
    })
    const [h, s, l] = hash.hsl(generateUUID());
    assertEquals([0.9, 1].includes(s), true);
    assertEquals([0.9, 1].includes(l), true);
})

Deno.test("Custom hash function", () => {
    const customHash = function (str: string) {
        var hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash += str.charCodeAt(i);
        }
        return hash;
    };

    const hash = new ColorHash({hash: customHash});
    const h = customHash('abc') % 359;

    assertEquals(hash.hsl('abc')[0], h);
})