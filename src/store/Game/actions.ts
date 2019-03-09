import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Control, GameState } from '../../types'

export const updateGameState = actionCreator<GameState>('updateGameState')
export const saveControl = actionCreator<Control>('saveControl')
export const startMoveStick = actionCreator<{
  x: number
  y: number
}>('startMoveStick')

// export const moveMoveStick = actionCreator<{
//   x: number
//   y: number
// }>('startMoveStick')

export const endMoveStick = actionCreator('endMoveStick')
