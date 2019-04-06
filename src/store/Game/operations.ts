import { ThunkAction } from '../../types'
import { loopBullets, shotBullet } from '../BulletById/operations'
import { loopPlayers } from '../PlayerById/operations'
import { getGameState } from './selectors'

export function loop(): ThunkAction {
  return (dispatch, getState) => {
    const game = getGameState(getState())
    if (game.processType === 'progress') {
      dispatch(loopPlayers())
      dispatch(loopBullets())
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
