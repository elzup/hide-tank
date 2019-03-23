import { ThunkAction } from '../../types'
import { genRnadom } from '../../utils'
import { browserHistory } from './'

export const historyPush = (path: string): ThunkAction => {
  return () => {
    browserHistory.push(path)
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
