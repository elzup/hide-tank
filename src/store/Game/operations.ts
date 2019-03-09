import { ThunkAction } from '../../types'

// 'mousemove', 'mousemove'
export function windowControlInit(): ThunkAction {
  return (dispatch, getState) => {
    window.addEventListener('touchstart', e => {
      console.log('start')
      console.log(e.touches)
    })
    window.addEventListener('touchmove', e => {
      console.log('move')
      console.log(e.touches)
    })
    window.addEventListener('touchend', e => {
      console.log('end')
      console.log(e.touches)
    })
    // dispatch()
    //
  }
}
