import { State, System } from '../../types'

export const getSystem = (state: State, id: string): System => {
  return state.System
}
