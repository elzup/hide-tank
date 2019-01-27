import actionCreatorFactory, { Action } from 'typescript-fsa'
import { Log } from '../../types'

const actionCreator = actionCreatorFactory()

export const updateLog = actionCreator<Log[]>('ACTIONS_UPDATE_LOG')
