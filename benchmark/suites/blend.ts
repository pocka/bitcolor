import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import * as colorFns from 'color-fns'
import tinycolor from 'tinycolor2'

const input = '#f00'
const blendColor = '#0f0'
const expected = '#808000'

export default suite('Blend colors', module, [
  {
    name: 'bitcolor',
    expected,
    run() {
      return bitcolor.toHexString(
        bitcolor.blend(
          bitcolor.fromHexString(input),
          bitcolor.fromHexString(blendColor)
        )
      )
    }
  },
  {
    name: 'chroma-js',
    expected,
    run() {
      const scale = chroma.scale([input, blendColor])

      return scale(0.5).toString()
    }
  },
  {
    name: 'color',
    expected: expected.toUpperCase(),
    run() {
      return Color(input)
        .mix(Color(blendColor))
        .hex()
    }
  },
  {
    name: 'color-fns',
    // I don't know this is expected
    expected: '#7f7f00',
    run() {
      return colorFns.formatHex(
        colorFns.rgbToHex(
          colorFns.mix(
            colorFns.hexToRgb(input)!,
            colorFns.hexToRgb(blendColor)!,
            0.5
          )
        )
      )
    }
  },
  {
    name: 'tinycolor2',
    expected,
    run() {
      return tinycolor
        .mix(tinycolor(input), tinycolor(blendColor))
        .toHexString()
    }
  }
])
