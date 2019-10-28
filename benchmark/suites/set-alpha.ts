import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import tinycolor from 'tinycolor2'

const input = '#fff'
const opacity = 0.5
const expected = '#ffffff80'

export default suite('Set alpha channel value', module, [
  {
    name: 'bitcolor',
    expected,
    run() {
      return bitcolor.toHexaString(
        bitcolor.setAlpha(bitcolor.fromHexString(input), opacity)
      )
    }
  },
  {
    name: 'chroma-js',
    expected,
    run() {
      return chroma(input)
        .alpha(opacity)
        .hex()
    }
  },
  {
    name: 'color',
    expected: 'rgba(255, 255, 255, 0.5)',
    run() {
      return Color(input)
        .fade(opacity)
        .rgb()
        .string()
    }
  },
  {
    name: 'tinycolor2',
    expected,
    run() {
      return tinycolor(input)
        .setAlpha(opacity)
        .toHex8String()
    }
  }
])
