import { MoveStick, SpeedType, ThunkAction } from '../../types'
import { endMoveStick, startMoveStick, updateMoveStick } from './actions'
import { getControl } from './selectors'

const judgeSpeedType = (r, threshold): SpeedType => {
  if (r <= threshold / 2) {
    return 'stop'
  }
  return r <= threshold ? 'walk' : 'run'
}

// 'mousemove', 'mousemove'
export function windowControlInit(): ThunkAction {
  return (dispatch, getState) => {
    window.addEventListener('touchstart', e => {
      const control = getControl(getState())
      if (!control) {
        return
      }
      Array.from(e.touches).map(touch => {
        // touch.clientX
        const x = touch.clientX
        const y = touch.clientY
        // TODO: 画面の左半分か
        if (x < window.innerWidth / 2) {
          dispatch(startMoveStick({ x, y }))
        }
      })
    })
    window.addEventListener('mousedown', e => {
      const control = getControl(getState())
      if (!control) {
        return
      }
      const x = e.clientX
      const y = e.clientY
      // TODO: 画面の左半分か
      if (x < window.innerWidth / 2) {
        dispatch(startMoveStick({ x, y }))
      }
    })
    // TODO: window.addEventListener('touchmove', e => {
    window.addEventListener('mousemove', e => {
      const control = getControl(getState())
      if (!control) {
        return
      }
      const { moveStick } = control
      if (moveStick.active) {
        const x = e.clientX
        const y = e.clientY
        const dx = x - moveStick.startPosition.x
        const dy = y - moveStick.startPosition.y
        const dr = Math.sqrt(dx * dx + dy * dy)
        const speedType = judgeSpeedType(dr, window.innerWidth / 4)
        const radian = Math.atan2(-dy, dx)

        const newMoveStick: MoveStick = {
          ...moveStick,
          currentPosition: { x, y },
          diffPosition: { x: dx, y: dy },
          speedType,
          radian,
        }
        dispatch(updateMoveStick(newMoveStick))
      }
    })
    // TODO: window.addEventListener('touchend', e => {
    window.addEventListener('mouseup', e => {
      const control = getControl(getState())
      if (!control) {
        return
      }
      if (control.moveStick.active) {
        dispatch(endMoveStick())
      }
    })
  }
}
