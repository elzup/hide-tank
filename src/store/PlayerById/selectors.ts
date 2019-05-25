import _ from 'lodash'
import { Player, State } from '../../types'

export const getGameState = (state: State) => {
  return state.Game
}

export const getAllPlayers = (state: State) => {
  return _.values(state.PlayerById)
}

export const getMyPlayer = (state: State): Player | undefined => {
  return state.PlayerById[state.Game.playerId]
}
