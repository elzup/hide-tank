import { ThunkAction } from '../../types'
import { genRnadom } from '../../utils'
import { history } from './'

export const historyPush = (path: string): ThunkAction => {
  return () => {
    history.push(path)
  }
}

const routings = {
  top: '/',
  game: '/game',
}

export const moveTopPage = () => historyPush(routings.top)
export const moveRandomGamePage = () => {
  const rand = genRnadom()
  return historyPush(routings.game + '/' + rand)
}
