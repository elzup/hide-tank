import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { GameProgressState } from '../../types'
import * as actions from './actions'

export type State = GameProgressState

const initialState: State = {
  playerId: '',
  enemyId: '',
  processType: 'progress',
  currentPlayerId: 0,
  timeLimit: config.timeLimit,
}

export const reducer = reducerWithInitialState<State>(initialState).case(
  actions.updateGameState,
  (state, payload) => {
    return { ...state, ...payload }
  }
)
