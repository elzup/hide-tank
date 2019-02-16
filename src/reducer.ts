import { combineReducers } from 'redux'
import { reducer as Game } from './store/Game/reducer'
import { reducer as System } from './store/System/reducer'
import { State } from './types'

export const rootReducer = combineReducers<State>({
  System,
  Game,
})
