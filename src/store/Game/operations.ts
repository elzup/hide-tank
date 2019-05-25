import io from 'socket.io-client'
import config from '../../config'
import { ThunkAction } from '../../types'
import { loopBullets, shotBullet } from '../BulletById/operations'
import { updatePlayer } from '../PlayerById/actions'
import { createPlayer, loopPlayers } from '../PlayerById/operations'
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

type UpdateData = {
  player: { id: string; position: { sx: number; sy: number }; hp: number }
  bullets: { id: number; x: number; y: number }[]
}
export function emitUpdate(data: UpdateData) {
  socket.emit('update', data)
}

export function setupWebsocket(roomId: string): ThunkAction {
  return (dispatch, getState) => {
    socket.on('connect', () => {
      socket.emit('join', { roomId })
      socket.on('playerId', data => {
        if (!data.playerId) {
          throw new Error("websocket error: can't get player id")
        }
        dispatch(createPlayer(data.playerId, true))
      })
      socket.on('start', data => {
        if (!data.playerIds) {
          throw new Error("websocket error: can't get player id")
        }
        const game = getGameState(getState())
        const enemyId = data.playerIds.filter(id => game.playerId != id)[0]
        dispatch(createPlayer(enemyId, false))
        // TODO: game state change
      })
      socket.on('update', (data: UpdateData) => {
        if (data.player.id === getState().Game.playerId) {
          return
        }
        console.log({ data })
        dispatch(updatePlayer(data.player))
        // update enemy player state
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
