import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { GameState } from '../../types'

export const updateGameState = actionCreator<GameState>('updateGameState')
