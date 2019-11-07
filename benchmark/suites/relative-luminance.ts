import { suite } from '../utils'

import * as bitcolor from '../../cjs'
import chroma from 'chroma-js'
import Color from 'color'
import tinycolor from 'tinycolor2'

const input = '#f00'

// Relative luminance of red (21.26%)
const expected = 0.2126

export default suite('Get relative luminance', module, [
  {
    name: 'bitcolor',
    expected,
    run() {
      return bitcolor.getRelativeLuminance(bitcolor.fromHexString(input))
    }
  },
  {
    name: 'chroma-js',
    expected,
    run() {
      return chroma(input).luminance()
    }
  },
  {
    name: 'color',
    expected,
    run() {
      return Color(input).luminosity()
    }
  },
  {
    name: 'tinycolor2',
    expected,
    run() {
      return tinycolor(input).getLuminance()
    }
  }
])
