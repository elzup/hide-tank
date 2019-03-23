import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { GameState } from '../../types'
import * as actions from './actions'

export type State = GameState

const initialState: State = {
  processType: 'progress',
  currentPlayerId: 0,
  players: [
    {
      id: 0,
      position: {
        sx: config.cellSize * 27,
        sy: config.cellSize * 37,
      },
      cellPosition: {
        cx: 27,
        cy: 37,
      },
      wepon: {
        weponId: 0,
        amount: 3,
        bullets: [],
      },
      vision: {
        pr: config.cellSize * 20,
      },
      hp: 10,
      speedType: 'stop',
      speed: 0,
    },
  ],
  timeLimit: config.timeLimit,
}

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.updateGameState, (state, payload) => {
    return payload
  })
  .case(actions.updatePlayer, (state, player) => {
    return _.merge({}, state, { players: [player] })
  })
