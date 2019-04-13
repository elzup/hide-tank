import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Bullet } from '../../types'
import * as actions from './actions'

export type State = { [id: number]: Bullet }

const initialState: State = []

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.receiveBullet, (state, obj) => {
    return { ...state, [obj.id]: obj }
  })
  .case(actions.removeBullet, (state, id) => {
    return _.omit(state, [id])
  })
