import { combineReducers } from 'redux'
import { reducer as graphDataById } from './containers/GraphDataById/reducer'
import { reducer as logById } from './containers/LogById/reducer'
import { reducer as speechArea } from './containers/SpeechArea/reducer'
import { State } from './types'

export const rootReducer = combineReducers<State>({
  speechArea,
  logById,
  graphDataById,
})
