import { actionCreatorFactory } from 'typescript-fsa'
import { Stage } from '../../types'
const actionCreator = actionCreatorFactory()

export const updateStage = actionCreator<Stage>('updateStage')
