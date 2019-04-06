import _ from 'lodash'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Control, MoveStick } from '../../types'
import * as actions from './actions'

export type State = Control

// const testvar = () => {
//   return [id<number>: 2, key<number>: 2]
// }

const initialState: State = {
  moveStick: { active: false },
  bulletButton: { active: false },
}

export const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.saveControl, (state, control) => {
    return { ...state, ...control }
  })
  .case(actions.startMoveStick, (state, { x, y }) => {
    const moveStick: MoveStick = {
      active: true,
      startPosition: { x, y },
      currentPosition: { x, y },
      diffPosition: { x: 0, y: 0 },
      speedType: 'stop',
      radian: 0,
    }
    return _.merge({}, state, { moveStick })
  })
  .case(actions.updateMoveStick, (state, moveStick) => {
    return _.merge({}, state, { moveStick })
  })
  .case(actions.endMoveStick, state => {
    return _.merge({}, state, { moveStick: { active: false } })
  })
  .case(actions.startBulletButton, state => {
    const bulletButton = { active: true }
    return _.merge({}, state, { bulletButton })
  })
  .case(actions.endBulletButton, state => {
    return _.merge({}, state, { bulletButton: { active: false } })
  })
