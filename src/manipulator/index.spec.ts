import { setAlpha } from '.'
import { fromRgba, toRgbaString } from '../'

describe('#setAlpha', () => {
  const color = fromRgba(1, 2, 3, 1)

  it('Should set alpha', () => {
    expect(toRgbaString(setAlpha(color, 0.5))).toEqual('rgba(1,2,3,0.5)')
    expect(toRgbaString(setAlpha(color, 0))).toEqual('rgba(1,2,3,0)')
    expect(toRgbaString(setAlpha(color, 1))).toEqual('rgba(1,2,3,1)')
  })

  it('Should limit value between 0 and 1', () => {
    expect(toRgbaString(setAlpha(color, -5))).toEqual('rgba(1,2,3,0)')
    expect(toRgbaString(setAlpha(color, 255))).toEqual('rgba(1,2,3,1)')
  })
})
