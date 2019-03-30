import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { Player } from '../../types'
import * as actions from './actions'

export type State = { [id: number]: Player }

const initialState: State = {
  0: {
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
      bulletIds: [],
    },
    vision: {
      pr: config.cellSize * 20,
    },
    hp: 10,
    speedType: 'stop',
    speed: 0,
  },
}

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.receivePlayer, (state, obj) => {
    return { ...state, [obj.id]: obj }
  })
  .case(actions.updatePlayer, (state, obj) => {
    return _.merge({}, state, { [obj.id]: obj })
  })
