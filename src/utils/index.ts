export const genRnadom = () =>
  Math.random()
    .toString(36)
    .slice(-8)

export const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}

export const xy2radian = (x: number, y: number): number => {
  return Math.atan2(-y, x)
}

export const round01 = (n: number): 1 | 0 | -1 => {
  if (n === 0) {
    return 0
  }
  if (n < 0) {
    return -1
  }
  return 1
}
