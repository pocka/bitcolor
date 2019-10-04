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

const pad = (str: string) => ('00' + str).slice(-2)

/**
 * Generate #rrggbbaa style string.
 *
 * @param v - color to stringify
 * @returns hexa string
 */
export const toHexaString = (v: Color): string => {
  const r = getR(v).toString(16)
  const g = getG(v).toString(16)
  const b = getB(v).toString(16)
  const a = getA(v).toString(16)

  return `#${pad(r)}${pad(g)}${pad(b)}${pad(a)}`
}

/**
 * Generate #rrggbb style string.
 * Alpha channel will be ignored.
 *
 * @param v - color to stringify
 * @returns hex string
 */
export const toHexString = (v: Color): string => {
  const r = getR(v).toString(16)
  const g = getG(v).toString(16)
  const b = getB(v).toString(16)

  return `#${pad(r)}${pad(g)}${pad(b)}`
}
