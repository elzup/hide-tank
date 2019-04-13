import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { GameState, MoveStick, Player } from '../../types'

export const updateGameState = actionCreator<GameState>('updateGameState')
export const startMoveStick = actionCreator<{
  x: number
  y: number
}>('startMoveStick')
