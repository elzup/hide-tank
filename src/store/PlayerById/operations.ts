import { Player, ThunkAction } from '../../types'
import { getControl } from '../Control/selectors'
import { updatePlayer } from './actions'
import { getMyPlayers } from './selectors'

const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}

const speedTypeRate: { [speedType: string]: number } = {
  stop: 0,
  walk: 2,
  run: 4,
}

export function loopPlayers(): ThunkAction {
  return async (dispatch, getState) => {
    const control = getControl(getState())
    const { moveStick } = control
    if (!moveStick.active) {
      return
    }
    const { radian, speedType } = moveStick
    if (speedType !== 'stop') {
      const player = getMyPlayers(getState())
      const speedRate = speedTypeRate[speedType] || 0
      const { x, y } = radian2xy(radian)
      const newPlayer: Player = {
        ...player,
        position: {
          sx: player.position.sx + x * speedRate,
          sy: player.position.sy + y * speedRate,
        },
      }
      await dispatch(updatePlayer(newPlayer))
    }
  }
}
