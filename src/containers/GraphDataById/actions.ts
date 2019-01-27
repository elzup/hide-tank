import actionCreatorFactory, { Action } from 'typescript-fsa'
import { GraphData, GraphType, Log } from '../../types'

const actionCreator = actionCreatorFactory()

export const updateGraphData = actionCreator<{
  id: GraphType
  data: GraphData
}>('ACTIONS_UPDATE_GRAPH_DATA')
