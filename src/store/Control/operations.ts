import { MoveStick, SpeedType, ThunkAction } from '../../types'

import { xy2radian } from '../../utils'
import {
  endBulletButton,
  endMoveStick,
  startBulletButton,
  startMoveStick,
  updateMoveStick,
} from './actions'

import { shotBullet } from '../BulletById/operations'
import { getControl } from './selectors'

const judgeSpeedType = (r, threshold): SpeedType => {
  if (r <= threshold / 2) {
    return 'stop'
  }
  return r <= threshold ? 'walk' : 'run'
}

function isDisplayLeft(x: number) {
  return x < window.innerWidth / 2
}

// 'mousemove', 'mousemove'
export function windowControlInit(): ThunkAction {
  return (dispatch, getState) => {
    window.addEventListener('touchstart', e => {
      const control = getControl(getState())
      const moveStickTouchId = control.moveStick.active
        ? control.moveStick.touchId
        : false
      Array.from(e.touches).map(touch => {
        if (touch.identifier === moveStickTouchId) {
          return
        }
        // touch.clientX
        const x = touch.clientX
        const y = touch.clientY
        const touchId = touch.identifier
        if (isDisplayLeft(x)) {
          dispatch(startMoveStick({ x, y, touchId }))
        } else {
          dispatch(startBulletButton())
          dispatch(shotBullet())
        }
      })
    })
    window.addEventListener('mousedown', e => {
      const control = getControl(getState())
      const x = e.clientX
      const y = e.clientY

      if (x < window.innerWidth / 2) {
        dispatch(startMoveStick({ x, y, touchId: 0 }))
      } else {
        control.moveStick.active
        dispatch(startBulletButton())
        dispatch(shotBullet())
      }
    })
    window.addEventListener('mousemove', e => {
      const state = getState()
      const control = getControl(state)
      if (!control) {
        return
      }
      const { moveStick } = control
      dispatch(updateMoveStick(calcMoveStick(moveStick, e.clientX, e.clientY)))
    })
    window.addEventListener('touchmove', e => {
      const state = getState()
      const control = getControl(state)
      const { moveStick } = control
      if (!moveStick.active) {
        return
      }
      const touch = e.touches[moveStick.touchId]
      dispatch(
        updateMoveStick(calcMoveStick(moveStick, touch.clientX, touch.clientY))
      )
    })
    window.addEventListener('mouseup', e => {
      const control = getControl(getState())
      if (!control) {
        return
      }
      if (control.moveStick.active) {
        dispatch(endMoveStick())
      }
      if (control.bulletButton) {
        dispatch(endBulletButton())
      }
    })
    window.addEventListener('touchend', e => {
      const control = getControl(getState())
      const { moveStick } = control
      console.log(e.touches)
      if (moveStick.active) {
        if (!e.touches[moveStick.touchId]) {
          dispatch(endMoveStick())
        }
      }
      if (control.bulletButton) {
        dispatch(endBulletButton())
      }
    })
  }
}

const calcMoveStick = (
  moveStick: MoveStick,
  x: number,
  y: number
): MoveStick => {
  if (!moveStick.active) {
    return moveStick
  }
  const dx = x - moveStick.startPosition.x
  const dy = y - moveStick.startPosition.y
  const dr = Math.sqrt(dx * dx + dy * dy)
  const speedType = judgeSpeedType(dr, window.innerWidth / 8)
  const radian = xy2radian(dx, dy)

  return {
    ...moveStick,
    currentPosition: { x, y },
    diffPosition: { x: dx, y: dy },
    speedType,
    radian,
  }
}
