import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { Player } from '../../types'
import * as actions from './actions'

export type State = { [id: number]: Player }
const initialState: State = {}

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
  .case(actions.removePlayerBullet, (state, obj) => {
    const oldPlayer = state[obj.playerId]
    const bulletIds = oldPlayer.wepon.bulletIds.filter(v => v !== obj.bulletId)
    const wepon = {
      weponId: oldPlayer.wepon.weponId,
      amount: oldPlayer.wepon.amount + 1,
      bulletIds,
    }
    return { ...state, [obj.playerId]: { ...oldPlayer, wepon } }
  })
