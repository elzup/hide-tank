import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Player } from '../../types'

export const receivePlayer = actionCreator<Player>('receivePlayer')
export const updatePlayer = actionCreator<Player>('updatePlayer')
export const addPlayerBullet = actionCreator<{
  playerId: number
  bulletId: number
}>('addPlayerBullet')
export const removePlayerBullet = actionCreator<{
  playerId: number
  bulletId: number
}>('removePlayerBullet')
