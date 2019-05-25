import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { GameProgressState } from '../../types'

export const updateGameState = actionCreator<Partial<GameProgressState>>(
  'updateGameState'
)
export const startMoveStick = actionCreator<{
  x: number
  y: number
}>('startMoveStick')
