import {
  Color,
  R_OFFSET,
  G_OFFSET,
  B_OFFSET,
  getR,
  getG,
  getB
} from '../shared'
import { cssNamedColors } from '../misc'

/**
 * Build color bits from RGBA values.
 */
export const fromRgba = (r: number, g: number, b: number, a: number): Color =>
  (r << R_OFFSET) | (g << G_OFFSET) | (b << B_OFFSET) | Math.round(a * 255)

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
    (f(0) << R_OFFSET) |
    (f(8) << G_OFFSET) |
    (f(4) << B_OFFSET) |
    Math.round(a * 255)
  )
}

/**
 * Build a color from the HWB(+A) color space value.
 * https://en.wikipedia.org/wiki/HWB_color_model
 */
export const fromHwb = (
  hue: number,
  white: number,
  black: number,
  alpha: number = 1.0
): Color => {
  // The sum of the white and the black is no larger than 1.0.
  const scale = white + black <= 1 ? 1 : 1 / (white + black)

  // Clamped values.
  const w2 = white * scale
  const b2 = black * scale

  const p = fromHsla(hue, 1, 0.5, alpha)

  const l = 1 - w2 - b2

  const r = (getR(p) / 255) * l + w2
  const g = (getG(p) / 255) * l + w2
  const b = (getB(p) / 255) * l + w2

  return (
    (Math.round(r * 255) << R_OFFSET) |
    (Math.round(g * 255) << G_OFFSET) |
    (Math.round(b * 255) << B_OFFSET) |
    Math.round(alpha * 255)
  )
}

// D50 to D65 transform matrix
const mD50ToD65 = [
  [0.9555766, -0.0230393, 0.0631636],
  [-0.0282895, 1.0099416, 0.0210077],
  [0.0122982, -0.020483, 1.3299098]
] as const

// XYZ(D65) to Linear RGB transform matrix
const mXyzToLinRgb = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.969266, 1.8760108, 0.041556],
  [0.0556434, -0.2040259, 1.0572252]
] as const

const linearRgbToSrgb = (v: number) =>
  v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : 12.92 * v

const clamp = (v: number) => Math.max(Math.min(v, 255), 0)

/**
 * (EXPERIMENTAL!)
 * Build a color from Lab color space.
 * https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @param l - lightness
 * @param a - the value of the a axis
 * @param b - the value of the b axis
 * @param alpha - alpha channel
 */
export const fromLab = (
  l: number,
  a: number,
  b: number,
  alpha: number = 1.0
): Color => {
  const k = 24389 / 27 // 29^3/3^3
  const e = 216 / 24389 // 6^3/29^3

  const f1 = (l + 16) / 116
  const f0 = a / 500 + f1
  const f2 = f1 - b / 200

  const f0p3 = Math.pow(f0, 3)
  const f2p3 = Math.pow(f2, 3)

  const x = (f0p3 > e ? f0p3 : (116 * f0 - 16) / k) * 0.96422
  const y = (l > k * e ? Math.pow(f1, 3) : l / k) * 1.0
  const z = (f2p3 > e ? f2p3 : (116 * f2 - 16) / k) * 0.82521

  const xd65 = mD50ToD65[0][0] * x + mD50ToD65[0][1] * y + mD50ToD65[0][2] * z
  const yd65 = mD50ToD65[1][0] * x + mD50ToD65[1][1] * y + mD50ToD65[1][2] * z
  const zd65 = mD50ToD65[2][0] * x + mD50ToD65[2][1] * y + mD50ToD65[2][2] * z

  const lr =
    mXyzToLinRgb[0][0] * xd65 +
    mXyzToLinRgb[0][1] * yd65 +
    mXyzToLinRgb[0][2] * zd65
  const lg =
    mXyzToLinRgb[1][0] * xd65 +
    mXyzToLinRgb[1][1] * yd65 +
    mXyzToLinRgb[1][2] * zd65
  const lb =
    mXyzToLinRgb[2][0] * xd65 +
    mXyzToLinRgb[2][1] * yd65 +
    mXyzToLinRgb[2][2] * zd65

  return (
    (Math.round(clamp(linearRgbToSrgb(lr) * 255)) << R_OFFSET) |
    (Math.round(clamp(linearRgbToSrgb(lg) * 255)) << G_OFFSET) |
    (Math.round(clamp(linearRgbToSrgb(lb) * 255)) << B_OFFSET) |
    Math.round(alpha * 255)
  )
}

const degreeToRadian = (degree: number) => (degree * Math.PI) / 180

/**
 * (EXPERIMENTAL!)
 * https://www.w3.org/TR/css-color-4/#lab-colors
 * @param l - lightness
 * @param c - chroma
 * @param h - hue (0 ~ 360, deg)
 */
export const fromLch = (
  l: number,
  c: number,
  h: number,
  alpha: number = 1.0
) => {
  const hr = degreeToRadian(h)

  return fromLab(l, c * Math.cos(hr), c * Math.sin(hr), alpha)
}

const rgbNotationPattern = /^rgba?\(/
const hslNotationPattern = /^hsla?\(/
const hwbNotationPattern = /^hwb\(/
const labNotationPattern = /^lab\(/
const lchNotationPattern = /^lch\(/
const grayNotationPattern = /^gray\(/

const rgbExtractor = /\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(\s+([\d.]+))?\s*\)/
const rgbpExtractor = /\(\s*([\d.]+)%\s+([\d.]+)%\s+([\d.]+)%(\s+([\d.]+))?\s*\)/

const hslHwbExtractor = /\(\s*([\d.]+)(deg)?\s+([\d.]+)%\s+([\d.]+)%(\s+([\d.]+))?\s*\)/

const labExtractor = /\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(\s+([\d.]+))?\s*\)/
const lchExtractor = /\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)(deg)?(\s+([\d.]+))?\s*\)/
const grayExtractor = /\(\s*([\d.]+)(\s+([\d.]+))?\s*\)/

/**
 * Parse CSS color string.
 * https://www.w3.org/TR/css-color-4/#resolving-color-values
 *
 * If the input is invalid or could not be parsed, returns
 * transparent black (rgba(0 0 0 0)).
 *
 * This function does not accept color() function and context
 * specific functions/colors, listed below:
 * - color()         ... too complex!
 * - device-cmyk()   ... depends on a device
 * - <system-colors> ... depends on a environment
 *                       https://www.w3.org/TR/css-color-4/#css-system-colors
 * - currentcolor    ... only usable with Document(HTML)+CSS
 */
export const fromCssString = (color: string): Color => {
  if (color === 'transparent') {
    // transparent black
    return 0
  }

  if (color.charAt(0) === '#') {
    return color.length === 4 || color.length === 7
      ? fromHexString(color)
      : fromHexaString(color)
  }

  if (rgbNotationPattern.test(color)) {
    // Convert alternative syntax to main one.
    // This isn't strict conversion since we need to check
    // whether every value is separeted by comma. But for
    // performance reasons, it ignore even if the input mixes
    // comma delimiters and space delimiters.
    const n = color.replace(/,/g, ' ')

    const rgb = n.match(rgbExtractor)

    if (rgb) {
      return fromRgba(
        parseFloat(rgb[1]),
        parseFloat(rgb[2]),
        parseFloat(rgb[3]),
        rgb[5] ? parseFloat(rgb[5]) : 1
      )
    }

    const rgbp = n.match(rgbpExtractor)

    if (rgbp) {
      return fromRgba(
        255 * (parseFloat(rgbp[1]) / 100),
        255 * (parseFloat(rgbp[2]) / 100),
        255 * (parseFloat(rgbp[3]) / 100),
        rgbp[5] ? parseFloat(rgbp[5]) : 1
      )
    }

    return 0
  }

  if (hslNotationPattern.test(color)) {
    // Convert alternative syntax to main one.
    const n = color.replace(/,/g, ' ')

    const hsl = n.match(hslHwbExtractor)

    if (!hsl) {
      return 0
    }

    return fromHsla(
      parseFloat(hsl[1]),
      parseFloat(hsl[3]) / 100,
      parseFloat(hsl[4]) / 100,
      hsl[6] ? parseFloat(hsl[6]) : 1
    )
  }

  if (hwbNotationPattern.test(color)) {
    const hwb = color.match(hslHwbExtractor)

    if (!hwb) {
      return 0
    }

    return fromHwb(
      parseFloat(hwb[1]),
      parseFloat(hwb[3]) / 100,
      parseFloat(hwb[4]) / 100,
      hwb[6] ? parseFloat(hwb[6]) : 1
    )
  }

  const namedColor = cssNamedColors[color.toLowerCase()]

  if (namedColor) {
    return namedColor
  }

  if (labNotationPattern.test(color)) {
    const lab = color.match(labExtractor)

    if (!lab) {
      return 0
    }

    return fromLab(
      parseFloat(lab[1]),
      parseFloat(lab[2]),
      parseFloat(lab[3]),
      lab[5] ? parseFloat(lab[5]) : 1
    )
  }

  if (lchNotationPattern.test(color)) {
    const lch = color.match(lchExtractor)

    if (!lch) {
      return 0
    }

    return fromLch(
      parseFloat(lch[1]),
      parseFloat(lch[2]),
      parseFloat(lch[3]),
      lch[6] ? parseFloat(lch[6]) : 1
    )
  }

  if (grayNotationPattern.test(color)) {
    const gray = color.match(grayExtractor)

    if (!gray) {
      return 0
    }

    return fromLab(parseFloat(gray[1]), 0, 0, gray[3] ? parseFloat(gray[3]) : 1)
  }

  return 0
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
