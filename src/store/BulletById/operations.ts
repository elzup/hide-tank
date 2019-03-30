import config from '../../config'
import { Bullet, ThunkAction } from '../../types'
import { receiveBullet } from './actions'
import { getMyPlayers } from './selectors'

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
      id: 1, // TODO: id を振る
      position,
      velosity: 1,
      radian,
      hp: 3, // CONFIG:
      pr: config.cellSize * 5, // CONFIG:
    }

    await dispatch(receiveBullet(bullet))
    // player.bullets に追加
  }
}
