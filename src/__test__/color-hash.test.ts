import stringHash from "string-hash";
import ColorHash, { options, testFroHSL2RGB, testForRGB2HEX } from "../color-hash";

function assertHueWithinRange(options: options, expectedRange: { min: number; max: number; }) {
  return assertHueWithinRanges(options, [expectedRange]);
}

function assertHueWithinRanges(options: options, rangesA: { min: number; max: number; }[]) {
  options.hash = stringHash; // This hash function spreads its results more

  function hueOf(s: string) {
    var colorHash = new ColorHash(options);
    var hsl = colorHash.hsl(s);
    return hsl[0];
  }

  const ranges = rangesA.map((range) => {
    return {
      min: range.min,
      max: range.max,
      size: range.max - range.min,
      minSeen: 1000,
      maxSeen: -1000
    };
  });

  const totalSize = ranges.reduce((sum, range) => {
    return sum + range.size;
  }, 0);

  const iterations = 10 * (totalSize + 1);
  var hue: number;
  for (let i = 0; i < iterations; i++) {
    hue = hueOf("This is some padding, and then a counter: " + i);
    expect(hue >= 0 || hue < 360).toBe(true)
    const withinAtLeastOneRange = ranges.reduce((
      withinAnyRangeYet,
      range
    ) => {
      const withinThisRange = hue >= range.min && hue <= range.max;
      if (withinThisRange) {
        range.minSeen = Math.min(range.minSeen, hue);
        range.maxSeen = Math.max(range.maxSeen, hue);
      }
      return withinAnyRangeYet || withinThisRange;
    },
      false);
    expect(withinAtLeastOneRange).toBe(true)
  }
  ranges.forEach((range) => {
    expect(Math.round(range.minSeen)).toBe(range.min)
    expect(Math.round(range.maxSeen)).toBe(range.max)
  });
}

describe("ColorHash", () => {
  describe("#Hue", () => {
    it("should return the hash color based on default hue", () => {
      assertHueWithinRange({}, { min: 0, max: 358 }); // hash % 359 means maximum 358
    });

    it("should return the hash color based on numeric hue", () => {
      assertHueWithinRange({ hue: 10 }, { min: 10, max: 10 });
    });

    it("should return the hash color based on same min, max", () => {
      var range = { min: 10, max: 10 };
      assertHueWithinRange({ hue: range }, range);
    });

    it("should return the hash color based on the given hue {min, max}", () => {
      var min, max, range;
      for (min = 0; min < 361; min += 60) {
        for (max = min + 1; max < 361; max += 60) {
          range = { min: min, max: max };
          assertHueWithinRange({ hue: range }, range);
        }
      }
    });

    // it("should have default value for min if only max is set", () => {
    //   assertHueWithinRange({ hue: { max: 10 } }, { min: 0, max: 10 });
    // });

    // it("should have default value for max if only min is set", () => {
    //   assertHueWithinRange({ hue: { min: 350 } }, { min: 350, max: 360 });
    // });

    it("should return the hash color based on different hue ranges", () => {
      var ranges = [
        { min: 30, max: 90 },
        { min: 180, max: 210 },
        { min: 270, max: 285 }
      ];
      assertHueWithinRanges({ hue: ranges }, ranges);
    });
  });

  describe("#Lightness & Saturation", () => {
    it("should return the hash color based on default lightness and saturation", () => {
      var colorHash = new ColorHash();
      var hsl = colorHash.hsl("");
      hsl.shift();
      expect(hsl).toEqual([0.35, 0.35]);
    });

    it("should return the hash color based on the given lightness and saturation", () => {
      var colorHash = new ColorHash({ lightness: 0.5, saturation: 0.5 });
      var hsl = colorHash.hsl("");
      expect([hsl[1], hsl[2]]).toEqual([0.5, 0.5]);
    });

    it("should return the hash color based on the given lightness array and saturation array", () => {
      var colorHash = new ColorHash({
        lightness: [0.9, 1],
        saturation: [0.9, 1]
      });
      var hsl = colorHash.hsl("");
      expect([hsl[1], hsl[2]]).toEqual([0.9, 0.9])
    });
  });

  describe("#CustomHash", () => {
    const customHash = (str: string): number => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
      }
      return hash;
    };
    const colorHash = new ColorHash({ hash: customHash });
    const hsl = [customHash("abc") % 359, 0.35, 0.35];
    const rgb = testFroHSL2RGB(hsl[0], hsl[1], hsl[2]);
    const hex = testForRGB2HEX(rgb);

    it("#hsl: should return the hsl color based on the given hash function", () => {
      expect(colorHash.hsl("abc")).toEqual(hsl);
    });
    it("#rgb: should return the rgb color based on the given hash function", () => {
      expect(colorHash.rgb("abc")).toEqual(rgb);
    });
    it("#hex: should return the hex color based on the given hash function", () => {
      expect(colorHash.hex("abc")).toEqual(hex);
    });
  });
});
