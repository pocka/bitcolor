import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import * as colorFns from 'color-fns'
import tinycolor from 'tinycolor2'

const input = '#fff'

// Hex string to RGB string
export default suite('Hex to RGB conversion', module, [
  {
    name: 'bitcolor',
    expected: 'rgb(255,255,255)',
    run() {
      return bitcolor.toRgbString(bitcolor.fromHexString(input))
    }
  },
  {
    name: 'chroma-js',
    expected: [255, 255, 255],
    run() {
      // it seems that chroma-js does not have rgb string conversion
      return chroma(input).rgb()
    }
  },
  {
    name: 'color',
    expected: 'rgb(255, 255, 255)',
    run() {
      return Color(input)
        .rgb()
        .string()
    }
  },
  {
    name: 'color-fns',
    expected: 'rgb(255,255,255)',
    run() {
      return colorFns.formatRgb(colorFns.hexToRgb(input))
    }
  },
  {
    name: 'tinycolor2',
    expected: 'rgb(255, 255, 255)',
    run() {
      return tinycolor(input).toRgbString()
    }
  }
])
