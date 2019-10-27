export type Color = number

// RGBA

// 8 bits * 4 channels = 32 bits
const RGBA_BIT_SIZE = 8

export const R_OFFSET = RGBA_BIT_SIZE * 3
export const G_OFFSET = RGBA_BIT_SIZE * 2
export const B_OFFSET = RGBA_BIT_SIZE

const RGBA_MASK_VALUE = (1 << RGBA_BIT_SIZE) - 1

export const R_MASK = RGBA_MASK_VALUE << R_OFFSET
export const G_MASK = RGBA_MASK_VALUE << G_OFFSET
export const B_MASK = RGBA_MASK_VALUE << B_OFFSET
export const A_MASK = RGBA_MASK_VALUE

export const getR = (v: number) => (v & R_MASK) >>> R_OFFSET
export const getG = (v: number) => (v & G_MASK) >>> G_OFFSET
export const getB = (v: number) => (v & B_MASK) >>> B_OFFSET
export const getA = (v: number) => v & A_MASK

// HSL

// 12 bits + (10 bits * 2 channels) = 32 bits
const H_BIT_LENGTH = 12
const SL_BIT_LENGTH = 10

export const H_OFFSET = SL_BIT_LENGTH * 2
export const S_OFFSET = SL_BIT_LENGTH

export const H_BIT_SIZE = (1 << H_BIT_LENGTH) - 1
export const SL_BIT_SIZE = (1 << SL_BIT_LENGTH) - 1

export const H_MASK = H_BIT_SIZE << H_OFFSET
export const S_MASK = SL_BIT_SIZE << S_OFFSET
export const L_MASK = SL_BIT_SIZE

/**
 * Get Hue (0~360)
 */
export const getH = (v: Color) => (v & H_MASK) >>> H_OFFSET

/**
 * Get Saturation (0.0~1.0)
 */
export const getS = (v: Color) => ((v & S_MASK) >>> S_OFFSET) / SL_BIT_SIZE

/**
 * Get Lightness (0.0~1.0)
 */
export const getL = (v: Color) => (v & L_MASK) / SL_BIT_SIZE
