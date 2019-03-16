import { MoveStick, ThunkAction } from '../../types'
import { startMoveStick } from './actions'
import { getControl } from './selectors'

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

    window.addEventListener('touchmove', e => {
      console.log('move')
      console.log(e.touches)
      // 保存する
    })
    window.addEventListener('touchend', e => {
      console.log('end')
      console.log(e.touches)
      // 保存する
    })

    // dispatch()
    //
  }
}
