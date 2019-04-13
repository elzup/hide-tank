import { State } from '../../types'

export const getControl = (state: State) => {
  return state.Control
}
export const getMoveStickTouchId = (state: State): number | false => {
  const control = getControl(state)
  return control.moveStick.active ? control.moveStick.touchId : false
}

export const getBulletButtonTouchId = (state: State) => {
  const control = getControl(state)
  return control.bulletButton.active ? control.bulletButton.touchId : -1
}
