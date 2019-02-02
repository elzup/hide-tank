import { combineReducers } from 'redux'
import { reducer as System } from './containers/System/reducer'
import { State } from './types'

export const rootReducer = combineReducers<State>({
  System,
})
