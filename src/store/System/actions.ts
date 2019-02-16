import actionCreatorFactory, { Action } from 'typescript-fsa'
import { System } from '../../types'

const actionCreator = actionCreatorFactory()

export const updateSystem = actionCreator<Partial<System>>('updateSystem')
