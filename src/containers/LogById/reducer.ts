import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Log } from '../../types'
import * as actions from './actions'

export interface State {
  [id: string]: Log
}

const initialState: State = {} as { [id: number]: Log }

export const reducer = reducerWithInitialState(initialState).case(
  actions.updateLog,
  (state, objects) => {
    return {
      ...state,
      ..._.keyBy(objects, 'id'),
    }
  }
)
