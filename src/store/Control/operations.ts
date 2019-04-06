import { MoveStick, SpeedType, ThunkAction } from '../../types'
import {
  endMoveStick,
  startMoveStick,
  updateMoveStick,
  endBulletButton,
  startBulletButton,
} from './actions'
import { getControl } from './selectors'
import { shotBullet } from '../BulletById/operations'

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
        } else if (x >= window.innerWidth / 2) {
          dispatch(startBulletButton())
          dispatch(shotBullet())
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
      } else if (x >= window.innerWidth / 2) {
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
      if (!control) {
        return
      }
      const { moveStick } = control
      Array.from(e.touches).map(touch => {
        dispatch(
          updateMoveStick(
            calcMoveStick(moveStick, touch.clientX, touch.clientY)
          )
        )
      })
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
  const radian = Math.atan2(-dy, dx)

  return {
    ...moveStick,
    currentPosition: { x, y },
    diffPosition: { x: dx, y: dy },
    speedType,
    radian,
  }
}
