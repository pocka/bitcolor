import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import * as colorFns from 'color-fns'
import tinycolor from 'tinycolor2'

const input = '#f00'
const compared = '#00f'

const expected = 2.15

const round = (v: number) => Math.round(v * 100) / 100

export default suite('Get the contrast ratio of two colors', module, [
  {
    name: 'bitcolor',
    expected,
    run() {
      return bitcolor.getContrastRatio(
        bitcolor.fromCssString(input),
        bitcolor.fromCssString(compared)
      )
    }
  },
  {
    name: 'chroma-js',
    expected,
    run() {
      return round(chroma.contrast(input, compared))
    }
  },
  {
    name: 'color',
    expected,
    run() {
      return round(Color(input).contrast(Color(compared)))
    }
  },
  {
    name: 'color-fns',
    expected,
    run() {
      return colorFns.contrastInfo(
        colorFns.hexToRgb(input)!,
        colorFns.hexToRgb(compared)!
      ).ratio
    }
  },
  {
    name: 'tinycolor2',
    expected,
    run() {
      return round(tinycolor.readability(input, compared))
    }
  }
])
