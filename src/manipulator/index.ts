import { Color, A_MASK } from '../shared'

/**
 * Set alpha to the given value.
 *
 * @param color - the color to be changed
 * @param alpha - the alpha value between 0.0~1.0
 * @returns the new color with specified alpha
 */
export const setAlpha = (color: Color, alpha: number): Color =>
  (color & ~A_MASK) | (Math.min(Math.max(alpha, 0), 1) * 255)
