# Color Hash

Generate color based on the given string.

## Demo

- [Live site](https://color-hash-ts-demo.now.sh/)
- [CodeSandbox](https://codesandbox.io/s/stupefied-wind-xjfwq)

## Usage

### Install
```sh
yarn add color-hash-ts
```

or

```sh
npm i color-hash-ts
```


#### Basic

Warning: API will change

```typescript
const colorHash = new ColorHash();

// in HSL, Hue ∈ [0, 360), Saturation ∈ [0, 1], Lightness ∈ [0, 1]
colorHash.hsl('Hello World'); // [ 225, 0.65, 0.35 ]

// in RGB, R, G, B ∈ [0, 255]
colorHash.rgb('Hello World'); // [ 135, 150, 197 ]

// in HEX
colorHash.hex('Hello World'); // '#8796c5'
```

#### Custom Hash Function

```typescript
const customHash = (str) => {
    let hash = 0;
    for(let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash;
};
const colorHash = new ColorHash({hash: customHash});
colorHash.hsl('Hello World!');
colorHash.rgb('Hello World!');
colorHash.hex('Hello World!');
```

#### Custom Hue

```typescript
const colorHash = new ColorHash({hue: 90});
```

```typescript
const colorHash = new ColorHash({hue: {min: 90, max: 270}});
```

```typescript
const colorHash = new ColorHash({hue: [ {min: 30, max: 90}, {min: 180, max: 210}, {min: 270, max: 285} ]});
```

#### Custom Lightness

```typescript
const colorHash = new ColorHash({lightness: 0.5});
```

```typescript
const colorHash = new ColorHash({lightness: [0.35, 0.5, 0.65]});
```

#### Custom Saturation

```typescript
const colorHash = new ColorHash({saturation: 0.5});
```

```typescript
const colorHash = new ColorHash({saturation: [0.35, 0.5, 0.65]});
```

## License

MIT.

## FAQ

### How does it work?

It uses the `hash` function (default is BKDRHash) to calculate the hash of the given string.

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
yarn
yarn test
```

### Build browser js

```bash
yarn
yarn build
```

