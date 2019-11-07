import { getRelativeLuminance } from '.'
import { fromHexString } from '../'

describe('#getRelativeLuminance', () => {
  it('Should returns relative luminance of the color', () => {
    expect(getRelativeLuminance(fromHexString('#fff'))).toEqual(1)
    expect(getRelativeLuminance(fromHexString('#000'))).toEqual(0)
    expect(getRelativeLuminance(fromHexString('#808080'))).toEqual(0.2159)
    expect(getRelativeLuminance(fromHexString('#f00'))).toEqual(0.2126)
  })
})
