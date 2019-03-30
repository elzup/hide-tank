import { combineReducers } from 'redux'
import { reducer as BulletById } from './store/BulletById/reducer'
import { reducer as Control } from './store/Control/reducer'
import { reducer as Game } from './store/Game/reducer'
import { reducer as PlayerById } from './store/PlayerById/reducer'
import { reducer as Stage } from './store/Stage/reducer'
import { reducer as System } from './store/System/reducer'
import { State } from './types'

export const rootReducer = combineReducers<State>({
  System,
  Game,
  Stage,
  Control,
  PlayerById,
  BulletById,
})
