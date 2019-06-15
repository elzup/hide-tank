import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { StageHeader } from '../../types'
import * as actions from './actions'

export type State = StageHeader

const initialState: State = {
  cw: 0,
  ch: 0,
}

export const reducer = reducerWithInitialState<State>(initialState).case(
  actions.updateStageHeader,
  (state, payload) => {
    return { ...state, ...payload }
  }
)
