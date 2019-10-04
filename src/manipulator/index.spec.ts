import { setAlpha, blend } from '.'
import { fromRgba, fromHexString, toRgbaString, toHexString } from '../'

describe('#setAlpha', () => {
  const color = fromRgba(1, 2, 3, 1)

  it('Should set alpha', () => {
    expect(toRgbaString(setAlpha(color, 0.5))).toEqual('rgba(1,2,3,0.5)')
    expect(toRgbaString(setAlpha(color, 0))).toEqual('rgba(1,2,3,0)')
    expect(toRgbaString(setAlpha(color, 1))).toEqual('rgba(1,2,3,1)')
  })

  it('Should clip alpha between 0 and 1', () => {
    expect(toRgbaString(setAlpha(color, -5))).toEqual('rgba(1,2,3,0)')
    expect(toRgbaString(setAlpha(color, 255))).toEqual('rgba(1,2,3,1)')
  })
})

describe('#blend', () => {
  const color1 = fromHexString('#036')
  const color2 = fromHexString('#d2e1dd')

  it('Should blend two colors', () => {
    // These tests are taken from Sass's docs
    expect(toHexString(blend(color1, color2))).toEqual('#698aa2')
    expect(toHexString(blend(color1, color2, 0.75))).toEqual('#355f84')
    expect(toHexString(blend(color1, color2, 0.25))).toEqual('#9eb6bf')
    expect(
      toRgbaString(
        blend(fromRgba(242, 236, 228, 0.5), fromHexString('#6b717f'))
      )
    ).toEqual('rgba(141,144,152,0.75)')
  })

  it('Should clip weight between 0 and 1', () => {
    expect(toHexString(blend(color1, color2, 100))).toEqual(toHexString(color1))
    expect(toHexString(blend(color1, color2, -100))).toEqual(
      toHexString(color2)
    )
  })
})
