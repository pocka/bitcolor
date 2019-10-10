import {
  toHexString,
  toHexaString,
  toHslaObject,
  toRgbString,
  toRgbaString
} from '.'
import { fromRgba, fromHexString } from '../'

describe('#toRgbaString', () => {
  it('Should convert to rgba(r,g,b,a)', () => {
    expect(toRgbaString(fromRgba(255, 0, 128, 0.5))).toEqual(
      'rgba(255,0,128,0.5)'
    )
  })
})

describe('#toRgbString', () => {
  it('Should convert to rgb(r,g,b)', () => {
    expect(toRgbString(fromRgba(123, 210, 1, 0))).toEqual('rgb(123,210,1)')
  })
})

describe('#toHexaString', () => {
  it('Should convert to #rrggbbaa', () => {
    expect(toHexaString(fromRgba(12, 34, 56, 0.8))).toEqual('#0c2238cc')
  })
})

describe('#toHexString', () => {
  it('Should convert to #rrggbb', () => {
    expect(toHexString(fromRgba(11, 255, 0, 0))).toEqual('#0bff00')
  })
})

describe('#toHslaObject', () => {
  it('Should convert RGB to HSL', () => {
    expect(toHslaObject(fromHexString('#000'))).toEqual({
      h: 0,
      s: 0,
      l: 0,
      a: 1
    })

    expect(toHslaObject(fromHexString('#fff'))).toEqual({
      h: 0,
      s: 0,
      l: 1,
      a: 1
    })

    const lightblue = toHslaObject(fromHexString('#80FFFF'))
    expect(lightblue.h).toEqual(180)
    expect(lightblue.s).toEqual(1)
    expect(lightblue.l).toBeCloseTo(0.75)
  })
})
