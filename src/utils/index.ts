export const genRnadom = () =>
  Math.random()
    .toString(36)
    .slice(-8)

export const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}
