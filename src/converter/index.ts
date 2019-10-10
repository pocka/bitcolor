import { Color, getA, getB, getG, getR } from '../shared'

/**
 * Generate rgba(r,g,b,a) style string.
 *
 * @param v- color to convert
 * @returns rgba formatted string
 */
export const toRgbaString = (v: Color): string => {
  const r = getR(v).toString(10)
  const g = getG(v).toString(10)
  const b = getB(v).toString(10)
  const a = (Math.round((getA(v) / 255) * 100) / 100).toString(10)

  return `rgba(${r},${g},${b},${a})`
}

/**
 * Generate rgb(r,g,b) style string.
 * Alpha channel will be ignored.
 *
 * @param v - color to convert
 * @returns rgb formatted string
 */
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
 * @param v - color to convert
 * @returns hexa formatted string
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
 * @param v - color to convert
 * @returns hex formatted string
 */
export const toHexString = (v: Color): string => {
  const r = getR(v).toString(16)
  const g = getG(v).toString(16)
  const b = getB(v).toString(16)

  return `#${pad(r)}${pad(g)}${pad(b)}`
}

export interface HSLA {
  /**
   * Hue
   */
  h: number

  /**
   * Saturation
   */
  s: number

  /**
   * Lightness
   */
  l: number

  /**
   * Alpha
   */
  a: number
}

/**
 * Generate HSLA object.
 *
 * @param color - color to convert
 * @returns HLSA object
 */
export const toHslaObject = (color: Color): HSLA => {
  const r = getR(color) / 255
  const g = getG(color) / 255
  const b = getB(color) / 255

  // Convertion formula
  // https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const c = max - min

  const h =
    60 *
    (c === 0
      ? 0
      : max === r
      ? ((g - b) / c) % 6
      : max === g
      ? (b - r) / c + 2
      : (r - g) / c + 4)

  const l = 0.5 * (max + min)

  const s = l === 1 || l === 0 ? 0 : c / (1 - Math.abs(2 * l - 1))

  return { h, s, l, a: getA(color) / 255 }
}
