import { State } from '../../types'

export const getGameState = (state: State) => {
  return state.Game
}

export const getPlayers = (state: State) => {
  const game = getGameState(state)
  if (game.processType === 'progress') {
    return game.players
  }
  return []
}

export const getControl = (state: State) => {
  const game = getGameState(state)
  if (game.processType === 'progress') {
    return game.control
  }
  return undefined
}

export const getMoveStick = (state: State) => {
  const game = getGameState(state)
  if (game.processType === 'progress') {
    return game.control.moveStick
  }
  return undefined
}
