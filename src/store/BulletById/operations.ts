import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
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
      let vx = velosity.x
      let vy = velosity.y
      let radian = velosity.radian
      if (ocx !== ncx || ocy !== ncy) {
        const cell = getCell(state, ncy, ncx)
        if (cell.type === 'wall') {
          if (ocx !== ncx) {
            vx *= -1
          }
          if (ocy !== ncy) {
            vy *= -1
          }
          radian = xy2radian(vx, vy)
        }
      }

      const newBullet: Bullet = {
        ...bullet,
        position: { sx, sy },
        velosity: {
          ...velosity,
          x: vx,
          y: vy,
          radian,
        },
      }
      dispatch(receiveBullet(newBullet))
    })
  }
}
