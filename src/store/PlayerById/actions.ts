import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Player } from '../../types'

export const receivePlayer = actionCreator<Player>('receivePlayer')
export const updatePlayer = actionCreator<Player>('updatePlayer')
export const updatePlayerBullet = actionCreator<{
  playerId: number
  bulletId: number
}>('updatePlayerBullet')
