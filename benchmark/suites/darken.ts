import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import tinycolor from 'tinycolor2'

const input = '#f00'

export default suite('Darken input', module, [
  {
    name: 'bitcolor',
    expected: '#e60000',
    run() {
      return bitcolor.toHexString(
        bitcolor.darken(bitcolor.fromCssString(input), 0.1)
      )
    }
  },
  {
    name: 'chroma-js',
    expected: '#e60000',
    run() {
      // chroma does not have straight-forward darken function
      return chroma(input)
        .set('hsl.l', 0.45)
        .hex()
    }
  },
  {
    name: 'color',
    expected: '#e60000'.toUpperCase(),
    run() {
      return Color(input)
        .darken(0.1)
        .hex()
    }
  },
  {
    name: 'tinycolor2',
    expected: '#e60000',
    run() {
      // idk why it works with the value '5'...
      return tinycolor(input)
        .darken(5)
        .toHexString()
    }
  }
])
