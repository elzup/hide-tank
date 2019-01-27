import moment from 'moment'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { GraphData, GraphType } from '../../types'
import * as actions from './actions'

// 1分で何文字喋ったか
export interface State {
  lastText: string
  selectedGraph: GraphType
}

const initialState: State = {
  lastText: '',
  selectedGraph: '30min',
}

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateLastText, (state, lastText) => {
    return { ...state, lastText }
  })
  .case(actions.selectGraph, (state, selectedGraph) => {
    return { ...state, selectedGraph }
  })
