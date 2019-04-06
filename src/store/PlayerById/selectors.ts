import _ from 'lodash'
import { State } from '../../types'

export const getGameState = (state: State) => {
  return state.Game
}

export const getAllPlayers = (state: State) => {
  return _.values(state.PlayerById)
}

export const getMyPlayers = (state: State) => {
  return state.PlayerById[0]
}
