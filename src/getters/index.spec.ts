import { getContrastRatio, getRelativeLuminance } from '.'
import { fromHexString } from '../'

describe('#getRelativeLuminance', () => {
  it('Should returns relative luminance of the color', () => {
    expect(getRelativeLuminance(fromHexString('#fff'))).toEqual(1)
    expect(getRelativeLuminance(fromHexString('#000'))).toEqual(0)
    expect(getRelativeLuminance(fromHexString('#808080'))).toEqual(0.2159)
    expect(getRelativeLuminance(fromHexString('#f00'))).toEqual(0.2126)
  })
})

describe('#getConstrastRatio', () => {
  it('Should returns constrast ratio of the colors', () => {
    const white = fromHexString('#fff')
    const black = fromHexString('#000')
    const red = fromHexString('#f00')
    const blue = fromHexString('#00f')

    expect(getContrastRatio(black, white)).toEqual(21)
    expect(getContrastRatio(black, black)).toEqual(1)
    expect(getContrastRatio(red, red)).toEqual(1)
    expect(getContrastRatio(blue, red)).toEqual(2.15)
  })
})
