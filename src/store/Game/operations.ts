import io from 'socket.io-client'
import config from '../../config'
import { ThunkAction } from '../../types'
import { loopBullets, shotBullet } from '../BulletById/operations'
import { loopPlayers } from '../PlayerById/operations'
import { getGameState } from './selectors'

const socket = io(config.websocket.url)

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

export function setupWebsocket(roomId: string): ThunkAction {
  return dispatch => {
    socket.on('connect', () => {
      socket.emit('join', { roomId })
      socket.on('playerId', data => {
        if (!data.playerId) {
          throw new Error("websocket error: can't get player id")
        }
        // TODO: playerID を設定する
      })
      socket.on('start', data => {
        if (!data.playerIds) {
          throw new Error("websocket error: can't get player id")
        }
        // TODO: make buttle player
      })
    })
  }
}

export function setupGame(roomId: string): ThunkAction {
  return dispatch => {
    dispatch(setupLoop())
    dispatch(setupWebsocket(roomId))
  }
}
