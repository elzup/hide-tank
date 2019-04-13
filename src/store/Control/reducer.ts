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
  .case(actions.startMoveStick, (state, { x, y, touchId }) => {
    const moveStick: MoveStick = {
      active: true,
      touchId,
      startPosition: { x, y },
      currentPosition: { x, y },
      diffPosition: { x: 0, y: 0 },
      speedType: 'stop',
      radian: 0,
    }
    return { ...state, moveStick }
  })
  .case(actions.updateMoveStick, (state, moveStick) => {
    return { ...state, moveStick }
  })
  .case(actions.endMoveStick, state => {
    return { ...state, moveStick: { active: false } }
  })
  .case(actions.startBulletButton, (state, { touchId }) => {
    const bulletButton = { active: true, touchId }
    return { ...state, bulletButton }
  })
  .case(actions.endBulletButton, state => {
    return { ...state, bulletButton: { active: false } }
  })
