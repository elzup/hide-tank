import _ from 'lodash'
import { State } from '../../types'
import { getAllPlayers, getMyPlayers } from '../PlayerById/selectors'

export const getBullets = (state: State) => {
  return _.values(state.BulletById)
}

export const getBullet = (state: State, id: number) => {
  return state.BulletById[id]
}

export const getAllBulletIds = (state: State) => {
  const players = getAllPlayers(state)
  return _.flatten(players.map(player => player.wepon.bulletIds))
}

export const getAllBullets = (state: State) => {
  return getAllBulletIds(state).map(id => getBullet(state, id))
}

export const getMyBullets = (state: State) => {
  return getMyPlayers(state).wepon.bulletIds.map(id => getBullet(state, id))
}
