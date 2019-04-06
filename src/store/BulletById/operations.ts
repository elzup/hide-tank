import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
import { radian2xy } from '../../utils'
import { addPlayerBullet } from '../PlayerById/actions'
import { getMyPlayers } from '../PlayerById/selectors'
import { getCell, getStage } from '../Stage/selectors'
import { receiveBullet } from './actions'
import { getMyBullets } from './selectors'

export function shotBullet(): ThunkAction {
  return async (dispatch, getState) => {
    const player = getMyPlayers(getState())
    if (player.wepon.amount <= 0) {
      return // 弾切れ
    }
    const { radian, position } = player
    const bullet: Bullet = {
      id: +Date.now(),
      position,
      velosity: config.cellSize,
      radian,
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
    const bullets = getMyBullets(getState())
    bullets.map(bullet => {
      const { radian, velosity } = bullet
      const { x, y } = radian2xy(radian)
      const sx = bullet.position.sx + x * velosity
      const sy = bullet.position.sy + y * velosity
      // 古いセル座標
      const ocx = Math.floor(bullet.position.sx / config.cellSize)
      const ocy = Math.floor(bullet.position.sy / config.cellSize)
      // 新しいセル座標
      const ncx = Math.floor(sx / config.cellSize)
      const ncy = Math.floor(sy / config.cellSize)
      let newRadian = bullet.radian
      if (ocx !== ncx || ocy !== ncy) {
        const cell = getCell(getState(), ncy, ncx)
        if (cell.type === 'wall') {
          newRadian += Math.PI
        }
      }

      const newBullet: Bullet = {
        ...bullet,
        position: { sx, sy },
        radian: newRadian,
      }
      dispatch(receiveBullet(newBullet))
    })
  }
}
