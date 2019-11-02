# bitcolor

[![Current status of Test and Lint workflow](https://github.com/pocka/bitcolor/workflows/Test%20and%20Lint/badge.svg)](https://github.com/pocka/bitcolor/actions)
[![Current status of Deploy docs workflow](https://github.com/pocka/bitcolor/workflows/Deploy%20docs/badge.svg)](https://github.com/pocka/bitcolor/actions)
[![Current status of Publish package workflow](https://github.com/pocka/bitcolor/workflows/Publish%20package/badge.svg)](https://github.com/pocka/bitcolor/actions)

[![npm](https://img.shields.io/npm/v/bitcolor)](https://www.npmjs.com/package/bitcolor)
[![npm](https://img.shields.io/npm/dm/bitcolor)](https://www.npmjs.com/package/bitcolor)

Small and simple color manipulation library.

[Document](https://pocka.github.io/bitcolor/)

## Installation

Use Yarn or npm.

```sh
yarn add bitcolor

# or npm
npm i bitcolor
```

## Usage

Just use exported functions!

```ts
import { fromRgb, toHexString, blend } from 'bitcolor'

const red = fromRgb(255, 0, 0)
const blue = fromRgb(0, 0, 255)

const purple = blend(red, blue)

console.log(toHexString(purple)) // #ff00ff
```

## Development

See [CONTRIBUTING.md](https://github.com/pocka/bitcolor/blob/master/CONTRIBUTING.md).
