import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { System } from '../../types'
import * as actions from './actions'

export type State = System

const initialState: State = {} as System

export const reducer = reducerWithInitialState(initialState).case(
  actions.updateSystem,
  (state, payload) => {
    return {
      ...state,
      ...payload,
    }
  }
)
