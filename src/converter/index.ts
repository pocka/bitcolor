import { Color, getA, getB, getG, getR } from '../shared'

export const toRgbaString = (v: Color): string => {
  const r = getR(v).toString(10)
  const g = getG(v).toString(10)
  const b = getB(v).toString(10)
  const a = (Math.round((getA(v) / 255) * 100) / 100).toString(10)

  return `rgba(${r},${g},${b},${a})`
}

export const toRgbString = (v: Color): string => {
  const r = getR(v).toString(10)
  const g = getG(v).toString(10)
  const b = getB(v).toString(10)

  return `rgb(${r},${g},${b})`
}
