import { AppState } from './state'

import { AnyAction } from 'redux'
import { ThunkAction as _ThunkAction } from 'redux-thunk'

export type ThunkAction = _ThunkAction<
  void | Promise<void>,
  State,
  undefined,
  AnyAction
>

export type GraphType = '3hour' | '1hour' | '30min'
export type State = AppState
export type ResultRecord = {
  text: string
  confidence: number
  timestamp: number
}

export type GraphRecord = {
  point: number
  timestamp: number
  timestampStr: string
  confidentAverage: number
}

export type GraphData = GraphRecord[]

export type Log = {
  id: string
  count: number
  confidentSum: number
  confidentAverage: number
  point: number
}

export type ConfidenceLib = {
  [key: string]: {
    sum: number
    count: number
    average: number
  }
}
