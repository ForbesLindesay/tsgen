# tsgen

Convert flow types to typescript types, automatically

[![Build Status](https://img.shields.io/travis/ForbesLindesay/tsgen/master.svg)](https://travis-ci.org/ForbesLindesay/tsgen)
[![Dependency Status](https://img.shields.io/david/ForbesLindesay/tsgen/master.svg)](http://david-dm.org/ForbesLindesay/tsgen)
[![NPM version](https://img.shields.io/npm/v/tsgen.svg)](https://www.npmjs.org/package/tsgen)

## Installation

```
npm install tsgen --save-dev
```

## Usage

```
tsgen "lib/**/*.js.flow" --ignore "lib/internal-modules/**/*.js.flow"
```

If you're using `export default foo;` style for exports in flow, but compiling that to `module.exports = ` style CommonJS exports, you will also need to pass in `--common-js-default-export`.

## License

MIT
