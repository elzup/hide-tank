import { GraphData, GraphType, State } from '../../types'
import { Log } from '../../types'

export const getLog = (state: State, id: string): Log | undefined => {
  return state.logById[id]
}

export const getGraphData = (state: State): GraphData => {
  return state.graphDataById[state.speechArea.selectedGraph] || []
}

export const getLastText = (state: State): string => {
  return state.speechArea.lastText
}
export const getSelectedGraph = (state: State): GraphType => {
  return state.speechArea.selectedGraph
}
