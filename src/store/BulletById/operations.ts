import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
import { radian2xy } from '../../utils'
import { updatePlayerBullet } from '../PlayerById/actions'
import { getMyPlayers } from '../PlayerById/selectors'
import { receiveBullet } from './actions'
import { getMyBullets } from './selectors'

export function shotBullet(): ThunkAction {
  return async (dispatch, getState) => {
    // player 取り出し
    const player = getMyPlayers(getState())
    const { radian, position } = player
    // 残弾数チェック
    // TODO: player.wepon.amount
    // Bullet obj
    // radian から dx, dy
    const bullet: Bullet = {
      id: +Date.now(),
      position,
      velosity: config.cellSize,
      radian,
      hp: 3, // CONFIG:
      pr: config.cellSize * 5, // CONFIG:
    }

    await dispatch(receiveBullet(bullet))
    dispatch(updatePlayerBullet({ playerId: player.id, bulletId: bullet.id }))
    // player.bullets に追加
  }
}

export function loopBullets(): ThunkAction {
  return async (dispatch, getState) => {
    const bullets = getMyBullets(getState())
    bullets.map(bullet => {
      const { radian, velosity } = bullet
      const { x, y } = radian2xy(radian)

      const newBullet: Bullet = {
        ...bullet,
        position: {
          sx: bullet.position.sx + x * velosity,
          sy: bullet.position.sy + y * velosity,
        },
      }
      dispatch(receiveBullet(newBullet))
    })
  }
}
