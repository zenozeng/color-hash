# CHANGELOG

## v2.0.2

- Expose ESM in package.json

## v2.0.1

- chore: dist/color-hash.js: tsc --module commonjs

## v2.0.0

Note: default options were changed in v2.x. Use the following options to get the same result of v1.x
```javascript
const colorHash = new ColorHash({hash: 'bkdr', saturation: [0.65, 0.35, 0.5], lightness: [0.65, 0.35, 0.5]})
```

- refactor: rewrite using deno
- feat: New default hash function: SHA256
- feat: Deno Module: https://deno.land/x/color_hash
- feat: ESM Module: dist/esm.js
- feat: UMD Module: dist/color-hash.js