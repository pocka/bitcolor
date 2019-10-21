import { setAlpha, blend, darken, lighten, rotate } from '.'
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

describe('#lighten', () => {
  it('Should lighten a input', () => {
    const gray = '#808080'

    expect(toHexString(lighten(fromHexString('#000'), 0.5))).toEqual(gray)
    expect(toHexString(lighten(fromHexString(gray), 0.5))).toEqual('#c0c0c0')
  })

  it('Should return white when amount is 1.0', () => {
    const white = '#ffffff'

    expect(toHexString(lighten(fromHexString('#000'), 1))).toEqual(white)
    expect(toHexString(lighten(fromHexString('#fff'), 1))).toEqual(white)
    expect(toHexString(lighten(fromHexString('#f00'), 1))).toEqual(white)
    expect(toHexString(lighten(fromHexString('#33a'), 1))).toEqual(white)
  })

  it('Should return input color when amount is 0.0', () => {
    expect(toHexString(lighten(fromHexString('#000'), 0))).toEqual('#000000')
    expect(toHexString(lighten(fromHexString('#fff'), 0))).toEqual('#ffffff')
    expect(toHexString(lighten(fromHexString('#f00'), 0))).toEqual('#ff0000')
    expect(toHexString(lighten(fromHexString('#33a'), 0))).toEqual('#3333aa')
  })
})

describe('#darken', () => {
  it('Should darken a input', () => {
    const gray = '#808080'

    expect(toHexString(darken(fromHexString('#fff'), 0.5))).toEqual(gray)
    expect(toHexString(darken(fromHexString(gray), 0.5))).toEqual('#404040')
  })

  it('Should return black when amount is 1.0', () => {
    const black = '#000000'

    expect(toHexString(darken(fromHexString('#000'), 1))).toEqual(black)
    expect(toHexString(darken(fromHexString('#fff'), 1))).toEqual(black)
    expect(toHexString(darken(fromHexString('#f00'), 1))).toEqual(black)
    expect(toHexString(darken(fromHexString('#33a'), 1))).toEqual(black)
  })

  it('Should return input color when amount is 0.0', () => {
    expect(toHexString(darken(fromHexString('#000'), 0))).toEqual('#000000')
    expect(toHexString(darken(fromHexString('#fff'), 0))).toEqual('#ffffff')
    expect(toHexString(darken(fromHexString('#f00'), 0))).toEqual('#ff0000')
    expect(toHexString(darken(fromHexString('#33a'), 0))).toEqual('#3333aa')
  })
})

describe('#rotate', () => {
  it('Should rotate the input value', () => {
    expect(toHexString(rotate(fromHexString('#f00'), 120))).toEqual('#00ff00')
    expect(toHexString(rotate(fromHexString('#0f0'), -120))).toEqual('#ff0000')
    expect(toHexString(rotate(fromHexString('#faa'), -120))).toEqual('#aaaaff')
  })
})
