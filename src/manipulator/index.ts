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
