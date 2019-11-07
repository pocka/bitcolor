import { Color } from '../shared'
import * as shared from '../shared'

/**
 * Get R/G/B from RsRGB/GsRGB/BsRGB.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
const toLinearRgb = (v: number) =>
  v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)

/**
 * Returns relative luminance of the color.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param color - the color to get relative luminance of
 * @returns relative luminance, between 0.0 to 1.0, where 0.0 is darkest black and 1.0 is lightest white.
 */
export const getRelativeLuminance = (color: Color): number => {
  const r = toLinearRgb(shared.getR(color) / 255)
  const g = toLinearRgb(shared.getG(color) / 255)
  const b = toLinearRgb(shared.getB(color) / 255)

  return Math.round((0.2126 * r + 0.7152 * g + 0.0722 * b) * 10000) / 10000
}

/**
 * Returns the constrast ratio of two colors.
 *
 * @param a - color1
 * @param b - color2
 * @returns the constrast ratio of color1 and color2, 1.0 ~ 21.0 (1:1 ~ 21:1).
 */
export const getContrastRatio = (a: Color, b: Color): number => {
  const la = getRelativeLuminance(a)
  const lb = getRelativeLuminance(b)

  const l1 = la > lb ? la : lb
  const l2 = la < lb ? la : lb

  return Math.round(((l1 + 0.05) / (l2 + 0.05)) * 100) / 100
}
