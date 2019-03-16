import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Control, GameState, MoveStick, Player } from '../../types'

export const updateGameState = actionCreator<GameState>('updateGameState')
export const saveControl = actionCreator<Control>('saveControl')
export const startMoveStick = actionCreator<{
  x: number
  y: number
}>('startMoveStick')

export const updateMoveStick = actionCreator<MoveStick>('updateMoveStick')
export const updatePlayer = actionCreator<Player>('updatePlayer')

export const endMoveStick = actionCreator('endMoveStick')
