import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { CellType, Stage } from '../../types'
import * as actions from './actions'

export type State = Stage

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

const initialState: State = makeStage()

export const reducer = reducerWithInitialState<State>(initialState).case(
  actions.updateStage,
  (state, payload) => {
    return payload
  }
)
