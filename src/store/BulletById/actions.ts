import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Bullet } from '../../types'

export const receiveBullet = actionCreator<Bullet>('receiveBullet')
export const updateBullet = actionCreator<Bullet>('updateBullet')
