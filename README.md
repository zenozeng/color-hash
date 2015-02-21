# Color Hash

Generate color based on the given string.

## Demo

https://zenozeng.github.io/color-hash/demo/

## Usage

### Browser

```bash
bower install color-hash
```

A UMD version of ColorHash was located in dist/.

Note that Array.prototype.map was used in color-hash,
a pollfill must be provided if you want to use it in IE8.

#### Basic

```javascript
var colorHash = new ColorHash();

// in HSL, Hue ∈ [0, 360), Saturation ∈ [0, 1], Lightness ∈ [0, 1]
colorHash.hsl('Hello World'); // [ 235, 0.65, 0.35 ]

// in RGB, R, G, B ∈ [0, 255]
colorHash.rgb('Hello World'); // [ 31, 41, 147 ]

// in HEX
colorHash.hex('Hello World'); // '#1f2993'
```

#### Custom Hash Function

```javascript
var customHash = function(str) {
    var hash = 0;
    for(var i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash;
};
var colorHash = new ColorHash({hash: customHash});
colorHash.hsl('Hello World!');
colorHash.rgb('Hello World!');
colorHash.hex('Hello World!');
```

#### Custom Lightness

```javascript
var colorHash = new ColorHash({lightness: 0.5});
```

```javascript
var colorHash = new ColorHash({lightness: [0.35, 0.5, 0.65]});
```

#### Custom Saturation

```javascript
var colorHash = new ColorHash({saturation: 0.5});
```

```javascript
var colorHash = new ColorHash({saturation: [0.35, 0.5, 0.65]});
```

### Node.JS

```bash
npm install color-hash --save
```

```javascript
var ColorHash = require('color-hash');
```

## License

MIT.

## FAQ

### How does it work?

Use the hash function (default is BKDRHash) to calculate the hash of the given string,

```
Hue = hash % 359. (Note that 359 is a prime)
Saturation = SaturationArray[hash / 360 % SaturationArray.length]
Lightness = LightnessArray[hash / 360 / Saturation.length % LightnessArray.length]

By default,
SaturationArray = LightnessArray = [0.35, 0.5, 0.65]
```

### Why not LAB?

Though LAB is more perceptually uniform, HSL is easier to control.
Simply sets lightness and saturation and change hue uniformly can generate uniform colors.

## Dev

### Test

```bash
sudo npm install -g mocha
sudo npm install -g istanbul
npm test
```

#### Coverage Report

https://zenozeng.github.io/color-hash/coverage/lcov-report/lib/index.html

### Build browser js

```bash
sudo npm install -g browserify
npm run build
```

### Follow Semantic Versioning

http://semver.org/lang/zh-CN/
