import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { GameState, MoveStick, Player } from '../../types'

export const updateGameState = actionCreator<GameState>('updateGameState')
export const startMoveStick = actionCreator<{
  x: number
  y: number
}>('startMoveStick')

export const updateMoveStick = actionCreator<MoveStick>('updateMoveStick')

export const endMoveStick = actionCreator('endMoveStick')
