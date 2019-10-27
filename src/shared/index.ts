export type Color = number

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
