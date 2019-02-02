import { AppState as _State } from './state'

import { AnyAction } from 'redux'
import { ThunkAction as _ThunkAction } from 'redux-thunk'
export type State = _State

export type ThunkAction = _ThunkAction<
  void | Promise<void>,
  State,
  undefined,
  AnyAction
>

export type System = {}
