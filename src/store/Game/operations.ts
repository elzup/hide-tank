import { Player, ThunkAction } from '../../types'
import { getControl } from '../Control/selectors'
import { updatePlayer } from './actions'
import { getGameState } from './selectors'

const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}

const speedTypeRate: { [speedType: string]: number } = {
  stop: 0,
  walk: 2,
  run: 4,
}

export function loop(): ThunkAction {
  return (dispatch, getState) => {
    const game = getGameState(getState())
    if (game.processType !== 'progress') {
      return
    }
    const control = getControl(getState())
    const { moveStick } = control
    if (moveStick.active) {
      const { radian, speedType } = moveStick
      const { x, y } = radian2xy(radian)
      if (speedType !== 'stop') {
        const player = game.players[0]
        const speedRate = speedTypeRate[speedType] || 0
        const newPlayer: Player = {
          ...player,
          position: {
            sx: player.position.sx + x * speedRate,
            sy: player.position.sy + y * speedRate,
          },
        }
        dispatch(updatePlayer(newPlayer))
      }
    }
  }
}

export function setupLoop(): ThunkAction {
  return dispatch => {
    setInterval(() => {
      dispatch(loop())
    }, 32)
  }
}
