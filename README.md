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

https://zenozeng.github.io/color-hash/test/coverage.html

### Build browser js

```bash
sudo npm install -g browserify
npm run build
```

### Follow Semantic Versioning

http://semver.org/lang/zh-CN/
