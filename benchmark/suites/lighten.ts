import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import tinycolor from 'tinycolor2'

const input = '#f00'

export default suite('Lighten color', module, [
  {
    name: 'bitcolor',
    expected: '#ff1a1a',
    run() {
      return bitcolor.toHexString(
        bitcolor.lighten(bitcolor.fromHexString(input), 0.1)
      )
    }
  },
  {
    name: 'chroma-js',
    expected: '#ff1a1a',
    run() {
      // chroma does not have straight-forward lighten function
      return chroma(input)
        .set('hsl.l', 0.55)
        .hex()
    }
  },
  {
    name: 'color',
    expected: '#ff1a1a'.toUpperCase(),
    run() {
      return Color(input)
        .lighten(0.1)
        .hex()
    }
  },
  {
    name: 'tinycolor2',
    expected: '#ff1919',
    run() {
      return tinycolor(input)
        .brighten(10)
        .toHexString()
    }
  }
])
