import { actionCreatorFactory } from 'typescript-fsa'
const actionCreator = actionCreatorFactory()
import { Player } from '../../types'

export const receivePlayer = actionCreator<Player>('receivePlayer')
export const updatePlayer = actionCreator<{ id: string } & Partial<Player>>(
  'updatePlayer'
)
export const addPlayerBullet = actionCreator<{
  playerId: string
  bulletId: number
}>('addPlayerBullet')
export const removePlayerBullet = actionCreator<{
  playerId: string
  bulletId: number
}>('removePlayerBullet')
