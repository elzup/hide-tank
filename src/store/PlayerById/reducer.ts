import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { Player } from '../../types'
import * as actions from './actions'

export type State = { [id: number]: Player }
const cellPosition = {
  cx: 27,
  cy: 37,
}

const initialState: State = {
  0: {
    id: 0,
    position: {
      sx: config.cellSize * cellPosition.cx + config.cellSize / 2,
      sy: config.cellSize * cellPosition.cy + config.cellSize / 2,
    },
    cellPosition,
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
    radian: 0,
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
  .case(actions.addPlayerBullet, (state, obj) => {
    const oldPlayer = state[obj.playerId]
    const player = {
      wepon: {
        amount: oldPlayer.wepon.amount - 1,
        bulletIds: [...oldPlayer.wepon.bulletIds, obj.bulletId],
      },
    }
    return _.merge({}, state, { [obj.playerId]: player })
  })
