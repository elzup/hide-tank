import { actionCreatorFactory } from 'typescript-fsa'
import { StageHeader } from '../../types'
const actionCreator = actionCreatorFactory()

export const updateStageHeader = actionCreator<StageHeader>('updateStageHeader')
