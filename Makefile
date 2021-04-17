test:
	deno test

build:
	mkdir -p dist
	deno bundle ./mod.ts dist/color-hash.js