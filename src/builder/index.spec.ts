import { fromHexString, fromHexaString, fromHsla, fromRgb, fromRgba } from '.'
import { toHexString } from '../'
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
