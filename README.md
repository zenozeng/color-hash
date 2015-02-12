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

### Why not LAB?

虽然 LAB 的色彩分布对人眼要更加线性一些，但是色域要更大，转换过程要更加复杂。
考虑的一个关键点在于，HSL 色彩空间可以很方便地控制参数，
比如亮度和饱和度，这样生成出来的颜色都是一个比较均匀和谐的分布。

## Dev

### Test

```bash
sudo npm install -g mocha
npm test
```

#### Coverage Report

100% coverage 47 SLOC

https://zenozeng.github.io/color-hash/test/coverage.html

### Build browser js

```bash
sudo npm install -g browserify
npm run build
```

### Follow Semantic Versioning

http://semver.org/lang/zh-CN/
