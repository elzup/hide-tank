import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import config from '../../config'
import { CellType, GameState, Stage } from '../../types'
import * as actions from './actions'

export type State = GameState

const stageText = `
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeewwwwwwwwwwwwwweeeeeeew
weeeeeeeewwwwwwwwwwwwwweeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeewwwwwwwwwwwwwweeeeeeeew
weeeeeeewwwwwwwwwwwwwweeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
weeeeeeeeeeeeeeeeeeeeeeeeeeeeew
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
`

const makeStage = (): Stage => {
  const lines = _.compact(stageText.split('\n'))
  // height > 1
  const stage: Stage = { cells: {}, ch: lines.length, cw: lines[0].length }
  lines.forEach((line, cy) => {
    stage.cells[cy] = {}
    line.split('').forEach((char, cx) => {
      if (!(char === 'e' || char === 'w')) {
        throw Error('Stage text invalid')
      }
      const lib: { [key: string]: CellType } = { w: 'wall', e: 'empty' }
      stage.cells[cy][cx] = {
        id: `${cy}_${cx}`,
        type: lib[char],
        position: { cx, cy },
      }
    })
  })
  return stage
}

const initialState: State = {
  processType: 'progress',
  currentPlayerId: 0,
  players: [
    {
      id: 0,
      position: {
        sx: config.cellSize * 27,
        sy: config.cellSize * 37,
      },
      cellPosition: {
        cx: 27,
        cy: 37,
      },
      wepon: {
        weponId: 0,
        amount: 3,
        bullets: [],
      },
      vision: {
        pr: config.cellSize * 20,
      },
      hp: 10,
      speedType: 'stop',
      speed: 0,
    },
  ],
  timeLimit: config.timeLimit,
  stage: makeStage(),
}

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.updateGameState, (state, payload) => {
    return payload
  })
  .case(actions.updatePlayer, (state, player) => {
    return _.merge({}, state, { players: [player] })
  })
