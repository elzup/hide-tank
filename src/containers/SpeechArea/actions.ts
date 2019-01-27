import actionCreatorFactory from 'typescript-fsa'
import { GraphType } from '../../types'

const actionCreator = actionCreatorFactory()

export const updateLastText = actionCreator<string>('UPDATE_LAST_TEXT')
export const selectGraph = actionCreator<GraphType>('SELECT_GRAPH')
