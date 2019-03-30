import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
import { updatePlayerBullet } from '../PlayerById/actions'
import { getMyPlayers } from '../PlayerById/selectors'
import { receiveBullet } from './actions'

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
      velosity: 1,
      radian,
      hp: 3, // CONFIG:
      pr: config.cellSize * 5, // CONFIG:
    }

    await dispatch(receiveBullet(bullet))
    dispatch(updatePlayerBullet({ playerId: player.id, bulletId: bullet.id }))
    // player.bullets に追加
  }
}
