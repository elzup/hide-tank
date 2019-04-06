import { number } from 'prop-types'
import config from '../../config'
import { Bullet, BulletVelosity, Cell, ThunkAction } from '../../types'
import { radian2xy, xy2radian } from '../../utils'
import { addPlayerBullet } from '../PlayerById/actions'
import { getMyPlayers } from '../PlayerById/selectors'
import { getCell } from '../Stage/selectors'
import { receiveBullet } from './actions'
import { getMyBullets } from './selectors'

export function shotBullet(): ThunkAction {
  return async (dispatch, getState) => {
    const player = getMyPlayers(getState())
    if (player.wepon.amount <= 0) {
      return // 弾切れ
    }
    const { radian, position } = player
    const velosityBase = config.cellSize
    const { x, y } = radian2xy(radian)
    const bullet: Bullet = {
      id: +Date.now(),
      position,
      velosity: {
        base: velosityBase,
        x: x * velosityBase,
        y: y * velosityBase,
        radian,
      },
      hp: 3, // CONFIG:
      pr: config.cellSize * 5, // CONFIG:
    }

    await dispatch(receiveBullet(bullet))
    dispatch(
      addPlayerBullet({
        playerId: player.id,
        bulletId: bullet.id,
      })
    )
  }
}

function calcBulletCollision(
  bullet: Bullet,
  nextCellX: Cell,
  nextCellY: Cell,
  ocp: {
    x: number
    y: number
  },
  ncp: {
    x: number
    y: number
  }
): {
  fixSx: number
  fixSy: number
  velosity: BulletVelosity
} {
  let reflect = false
  let radian = bullet.velosity.radian
  const { velosity } = bullet
  let vx = velosity.x
  let vy = velosity.y
  let fixSx = 0
  let fixSy = 0
  if (ocp.x !== ncp.x) {
    if (nextCellX.type === 'wall') {
      reflect = true
      vx *= -1
      fixSx = -velosity.x
    }
  }
  if (ocp.y !== ncp.y) {
    if (nextCellY.type === 'wall') {
      reflect = true
      vy *= -1
      fixSy = -velosity.y
    }
  }
  if (reflect) {
    radian = xy2radian(vx, vy)
  }
  return {
    fixSx,
    fixSy,
    velosity: {
      ...velosity,
      x: vx,
      y: vy,
      radian,
    },
  }
}

export function loopBullets(): ThunkAction {
  return async (dispatch, getState) => {
    const state = getState()
    const bullets = getMyBullets(state)
    bullets.map(bullet => {
      const { velosity } = bullet
      const sx = bullet.position.sx + velosity.x
      const sy = bullet.position.sy + velosity.y
      // 古いセル座標
      const ocx = Math.floor(bullet.position.sx / config.cellSize)
      const ocy = Math.floor(bullet.position.sy / config.cellSize)
      // 新しいセル座標
      const ncx = Math.floor(sx / config.cellSize)
      const ncy = Math.floor(sy / config.cellSize)
      const nextCellX = getCell(state, ocy, ncx)
      const nextCellY = getCell(state, ncy, ocx)
      const calced = calcBulletCollision(
        bullet,
        nextCellX,
        nextCellY,
        { x: ocx, y: ocy },
        { x: ncx, y: ncy }
      )

      const newBullet: Bullet = {
        ...bullet,
        position: { sx: sx + calced.fixSx, sy: sy + calced.fixSy },
        velosity: calced.velosity,
      }
      dispatch(receiveBullet(newBullet))
    })
  }
}
