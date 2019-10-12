import { Color, R_OFFSET, G_OFFSET, B_OFFSET } from '../shared'

/**
 * Build color bits from RGBA values.
 */
export const fromRgba = (r: number, g: number, b: number, a: number): Color =>
  (r << R_OFFSET) | (g << G_OFFSET) | (b << B_OFFSET) | (a * 255)

/**
 * Build color bits from RGB values.
 * Alpha is fixed to 1.0.
 */
export const fromRgb = (r: number, g: number, b: number): Color =>
  fromRgba(r, g, b, 1.0)

/**
 * Build color from HSL(A).
 * https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 */
export const fromHsla = (
  h: number,
  s: number,
  l: number,
  a: number = 1.0
): Color => {
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const b = s * Math.min(l, 1 - l)

    return Math.round((l - b * Math.max(Math.min(k - 3, 9 - k, 1), -1)) * 255)
  }

  return (
    (f(0) << R_OFFSET) | (f(8) << G_OFFSET) | (f(4) << B_OFFSET) | (a * 255)
  )
}

/**
 * Build color bits from hexa color notation.
 * e.g. #ffff, #f0f0f0ff
 */
export const fromHexaString = (hexa: string): Color => {
  const val = hexa.replace(/^#/, '')

  const shorthand = val.length === 4

  // Ignore invalid hex color notation
  if (!shorthand && val.length !== 8) {
    return 0
  }

  const r = parseInt(shorthand ? val[0] + val[0] : val.slice(0, 2), 16)
  const g = parseInt(shorthand ? val[1] + val[1] : val.slice(2, 4), 16)
  const b = parseInt(shorthand ? val[2] + val[2] : val.slice(4, 6), 16)
  const a = parseInt(shorthand ? val[3] + val[3] : val.slice(6, 8), 16)

  return (r << R_OFFSET) | (g << G_OFFSET) | (b << B_OFFSET) | a
}

/**
 * Build color bits from hex color notation.
 * e.g. #fff, #f0f0f0
 */
export const fromHexString = (hex: string): Color =>
  fromHexaString(hex.length === 4 ? hex + 'f' : hex + 'ff')
