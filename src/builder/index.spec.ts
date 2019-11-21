import {
  fromCssString,
  fromHexString,
  fromHexaString,
  fromHsla,
  fromHwb,
  fromRgb,
  fromRgba
} from '.'
import { toHexString, toHexaString } from '../'
import { getA, getB, getG, getR } from '../shared'

describe('#fromRgba', () => {
  it('Should construct u32 from each values', () => {
    const color = fromRgba(128, 255, 9, 0.3)

    expect(getR(color)).toEqual(128)
    expect(getG(color)).toEqual(255)
    expect(getB(color)).toEqual(9)
    expect(getA(color)).toEqual(Math.round(0.3 * 255))
  })
})

describe('#fromRgb', () => {
  it('Should construct u32 from each values', () => {
    const color = fromRgb(111, 222, 0)

    expect(getR(color)).toEqual(111)
    expect(getG(color)).toEqual(222)
    expect(getB(color)).toEqual(0)
    expect(getA(color)).toEqual(255)
  })
})

describe('#fromHsla', () => {
  it('Should construct u32 from each values', () => {
    expect(toHexString(fromHsla(0, 0, 0, 1))).toEqual('#000000')
    expect(toHexString(fromHsla(0, 0, 1, 1))).toEqual('#ffffff')
    expect(toHexString(fromHsla(180, 1, 0.75, 1))).toEqual('#80ffff')
  })
})

describe('#fromHexString', () => {
  it('Should parse #rgb format', () => {
    expect(fromHexString('#abc')).toEqual(fromRgb(0xaa, 0xbb, 0xcc))
  })

  it('Should parse #rrggbb format', () => {
    expect(fromHexString('#abcdef')).toEqual(fromRgb(0xab, 0xcd, 0xef))
  })

  it('Should ignore invalid format', () => {
    expect(fromHexString('#abcd')).toEqual(0)
  })
})

describe('#fromHexaString', () => {
  it('Should parse #rgba', () => {
    expect(fromHexaString('#abcd')).toEqual(
      fromRgba(0xaa, 0xbb, 0xcc, 0xdd / 255)
    )
  })

  it('Should parse #rrggbbaa', () => {
    expect(fromHexaString('#01234567')).toEqual(
      fromRgba(0x01, 0x23, 0x45, 0x67 / 255)
    )
  })

  it('Should ignore invalid format', () => {
    expect(fromHexaString('#012345678')).toEqual(0)
  })
})

describe('#fromHwb', () => {
  it('Should convert HWB to RGB', () => {
    expect(toHexString(fromHwb(0, 1, 0))).toEqual('#ffffff')
    expect(toHexString(fromHwb(0, 0, 1))).toEqual('#000000')
    expect(toHexString(fromHwb(0, 0, 0))).toEqual('#ff0000')
    expect(toHexString(fromHwb(0, 1, 1))).toEqual('#808080')
    expect(toHexString(fromHwb(120, 0, 0))).toEqual('#00ff00')
  })
})

describe('#fromCssString', () => {
  const transparentBlack = '#00000000'
  const red = '#ff0000ff'
  const green = '#00ff00ff'

  it('Should parse transparent keyword', () => {
    expect(toHexaString(fromCssString('transparent'))).toEqual(transparentBlack)
  })

  it('Should parse hex format', () => {
    expect(toHexaString(fromCssString('#f00'))).toEqual(red)
    expect(toHexaString(fromCssString('#00ff00'))).toEqual(green)
    expect(toHexaString(fromCssString('#f000'))).toEqual('#ff000000')
    expect(toHexaString(fromCssString('#00ff0000'))).toEqual('#00ff0000')
  })

  it('Should parse rgb function', () => {
    expect(toHexaString(fromCssString('rgb(255 0 0 )'))).toEqual(red)
    expect(toHexaString(fromCssString('rgba(255 0 0 )'))).toEqual(red)
    expect(toHexaString(fromCssString('rgb(0,255,0)'))).toEqual(green)
    expect(toHexaString(fromCssString('rgba(0,255,0)'))).toEqual(green)
    expect(toHexaString(fromCssString('rgb(255,0,0,0.5)'))).toEqual('#ff000080')
    expect(toHexaString(fromCssString('rgb(100% 00% 0%)'))).toEqual(red)
    expect(toHexaString(fromCssString('rgb(100% 00% 0% 0.5)'))).toEqual(
      '#ff000080'
    )
    expect(toHexaString(fromCssString('rgb(0%, 100%, 0%)'))).toEqual(green)
    expect(toHexaString(fromCssString('rgb(0%, 100%, 0%,0)'))).toEqual(
      '#00ff0000'
    )
  })

  it('Should parse hsl function', () => {
    expect(toHexaString(fromCssString('hsl(0 100% 50%)'))).toEqual(red)
    expect(toHexaString(fromCssString('hsla(0 100% 50%)'))).toEqual(red)
    expect(toHexaString(fromCssString('hsl(0 100% 50% 0)'))).toEqual(
      '#ff000000'
    )
    expect(toHexaString(fromCssString('hsl(120deg 100% 50%)'))).toEqual(green)
    expect(
      toHexaString(fromCssString('hsl(120deg , 100% , 50% , .5)'))
    ).toEqual('#00ff0080')
  })

  it('Should parse hwb function', () => {
    expect(toHexaString(fromCssString('hwb(0 0% 0%)'))).toEqual(red)
    expect(toHexaString(fromCssString('hwb(90deg 100% 100% 0.5)'))).toEqual(
      '#80808080'
    )
  })

  it('Should handle CSS named colors', () => {
    expect(toHexaString(fromCssString('black'))).toEqual('#000000ff')
    expect(toHexaString(fromCssString('cyan'))).toEqual('#00ffffff')
  })
})
