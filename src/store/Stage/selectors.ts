import { State } from '../../types'

export const getStage = (state: State) => {
  return state.Stage
}

export const getCell = (state: State, cy: number, cx: number) => {
  return state.Stage.cells[cy][cx]
}
