export type Color = number

export const R_OFFSET = 8 * 3
export const G_OFFSET = 8 * 2
export const B_OFFSET = 8

export const R_MASK = 0xff << R_OFFSET
export const G_MASK = 0xff << G_OFFSET
export const B_MASK = 0xff << B_OFFSET
export const A_MASK = 0xff

export const getR = (v: number) => (v & R_MASK) >>> R_OFFSET
export const getG = (v: number) => (v & G_MASK) >>> G_OFFSET
export const getB = (v: number) => (v & B_MASK) >>> B_OFFSET
export const getA = (v: number) => v & A_MASK
