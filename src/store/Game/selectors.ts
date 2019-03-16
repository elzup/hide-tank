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
