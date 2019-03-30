import { ThunkAction } from '../../types'
import { shotBullet } from '../BulletById/operations'
import { loopPlayers } from '../PlayerById/operations'
import { getGameState } from './selectors'

const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}

export function loop(): ThunkAction {
  return (dispatch, getState) => {
    const game = getGameState(getState())
    if (game.processType === 'progress') {
      dispatch(loopPlayers())
    }
  }
}

export function setupLoop(): ThunkAction {
  return dispatch => {
    dispatch(shotBullet())
    setInterval(() => {
      dispatch(loop())
    }, 32)
  }
}
