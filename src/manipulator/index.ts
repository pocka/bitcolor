import {
  Color,
  A_MASK,
  R_OFFSET,
  G_OFFSET,
  B_OFFSET,
  getA,
  getB,
  getG,
  getR
} from '../shared'
import { toHslaObject, fromHsla } from '..'

/**
 * Set alpha to the given value.
 *
 * @param color - the color to be changed
 * @param alpha - the alpha value between 0.0~1.0
 * @returns the new color with specified alpha
 */
export const setAlpha = (color: Color, alpha: number): Color =>
  (color & ~A_MASK) | (Math.min(Math.max(alpha, 0), 1) * 255)

/**
 * Blend two colors.
 * Ratio is calculated based on weight and each colors' alpha value.
 *
 * @param a - the base color
 * @param b - the added color
 * @param weight - how much of a is in the result, between 0.0-1.0
 * @returns the blended color
 */
export const blend = (a: Color, b: Color, weight: number = 0.5): Color => {
  const clippedWeight = Math.min(1, Math.max(0, weight))

  const alphaA = getA(a)
  const alphaB = getA(b)

  // This mixing algorithm is ported from Sass.
  // https://github.com/sass/dart-sass/blob/1.23.0/lib/src/functions/color.dart#L720
  const normalizedWeight = clippedWeight * 2 - 1
  const alphaDistance = alphaA / 255 - alphaB / 255

  const combinedWeight =
    normalizedWeight * alphaDistance === -1
      ? normalizedWeight
      : (normalizedWeight + alphaDistance) /
        (1 + normalizedWeight * alphaDistance)

  // Final weight of a, clipped to 0.0-1.0
  const w = (combinedWeight + 1) / 2

  return (
    (Math.round(getR(a) * w + getR(b) * (1 - w)) << R_OFFSET) |
    (Math.round(getG(a) * w + getG(b) * (1 - w)) << G_OFFSET) |
    (Math.round(getB(a) * w + getB(b) * (1 - w)) << B_OFFSET) |
    (Math.round(alphaA * clippedWeight + alphaB * (1 - clippedWeight)) | 0)
  )
}

/**
 * Make color lighter.
 * This operation is equvalent to Sass's scale function with lightness parameter.
 *
 * @param color - the color to lighten
 * @param amount - between 0.0-1.0, where 0.0 is same as input and 1.0 is white (#fff)
 * @returns the lightened color
 */
export const lighten = (color: Color, amount: number): Color => {
  const hlsa = toHslaObject(color)

  const newL = Math.min(hlsa.l * (1 - amount) + amount, 1)

  return fromHsla(hlsa.h, hlsa.s, newL, hlsa.a)
}

/**
 * Make color darker.
 * This operation is equvalent to Sass's scale function with lightness parameter with negative value.
 *
 * @param color - the color to lighten
 * @param amount - between 0.0-1.0, where 0.0 is same as input and 1.0 is black (#000)
 * @returns the darkened color
 */
export const darken = (color: Color, amount: number): Color => {
  const hlsa = toHslaObject(color)

  const newL = Math.max(hlsa.l * (1 - amount), 0)

  return fromHsla(hlsa.h, hlsa.s, newL, hlsa.a)
}

/**
 * Rotate hue value of the input.
 *
 * @param color - the color to rotate hue
 * @param degree - degree to add to the color's hue between -360~360
 * @returns the rotated color
 */
export const rotate = (color: Color, degree: number): Color => {
  const hlsa = toHslaObject(color)

  const newH = Math.max(
    Math.min(((hlsa.h + degree < 0 ? 360 : 0) + hlsa.h + degree) % 360, 360),
    -360
  )

  return fromHsla(newH, hlsa.s, hlsa.l, hlsa.a)
}
