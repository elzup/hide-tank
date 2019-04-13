import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Control, MoveStick } from '../../types'

export const saveControl = actionCreator<Control>('saveControl')
export const startMoveStick = actionCreator<{
  x: number
  y: number
  touchId: number
}>('startMoveStick')

export const updateMoveStick = actionCreator<MoveStick>('updateMoveStick')

export const endMoveStick = actionCreator('endMoveStick')

export const startBulletButton = actionCreator('startBulletButton')

export const endBulletButton = actionCreator('endBulletButton')
