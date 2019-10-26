# Guide

**bitcolor** is a JavaScript library which do parse, manipulate and convert colors.

## Features

- Just a set of functions
  - Tree-shakable.
  - No `new`.
  - Every function is pure.
- Performance
  - (idk it's realy perfomant tho.)
  - Color is represented as number (32 bit integer).
  - Unless you use HSL related functions, we won't use objects: no GC impact.
- Simple
  - Designed for simplicity.

## Quick start

First, install the library with yarn or npm.

```sh
yarn add bitcolor

# with npm
npm i bitcolor
```

Then use it within your code!

```js
import { fromRgb, toHexString, blend } from 'bitcolor'

const red = fromRgb(255, 0, 0)
const blue = fromRgb(0, 0, 255)

const purple = blend(red, blue)

console.log(toHexString(purple)) // #ff00ff
```
