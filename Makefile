test:
	deno test

build:
	mkdir -p dist
	deno bundle mod.ts > dist/bundle.js
	npx tsc --allowJs dist/bundle.js --outDir tmp
	cp tmp/bundle.js dist/color-hash.js
	rm -rf tmp