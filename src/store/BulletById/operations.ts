import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
import { radian2xy } from '../../utils'
import { addPlayerBullet } from '../PlayerById/actions'
import { getMyPlayers } from '../PlayerById/selectors'
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
