import { MoveStick, Player, SpeedType, ThunkAction } from '../../types'
import {
  endMoveStick,
  startMoveStick,
  updateMoveStick,
  updatePlayer,
} from './actions'
import { getControl, getGameState, getPlayers } from './selectors'

const judgeSpeedType = (r, threshold): SpeedType => {
  if (r <= threshold / 2) {
    return 'stop'
  }
  return r <= threshold ? 'walk' : 'run'
}

const radian2xy = (radian: number): { x: number; y: number } => {
  return { x: Math.cos(radian), y: -Math.sin(radian) }
}

const speedTypeRate: { [speedType: string]: number } = {
  stop: 0,
  walk: 2,
  run: 4,
}

export function loop(): ThunkAction {
  return (dispatch, getState) => {
    const game = getGameState(getState())
    if (game.processType !== 'progress') {
      return
    }
    const {
      control: { moveStick },
    } = game
    if (moveStick.active) {
      const { radian, speedType } = moveStick
      const { x, y } = radian2xy(radian)
      if (speedType !== 'stop') {
        const player = game.players[0]
        const speedRate = speedTypeRate[speedType] || 0
        const newPlayer: Player = {
          ...player,
          position: {
            sx: player.position.sx + x * speedRate,
            sy: player.position.sy + y * speedRate,
          },
        }
        dispatch(updatePlayer(newPlayer))
      }
    }
  }
}

export function setupLoop(): ThunkAction {
  return dispatch => {
    setInterval(() => {
      dispatch(loop())
    }, 60)
  }
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
      const state = getState()
      const control = getControl(state)
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
        const speedType = judgeSpeedType(dr, window.innerWidth / 8)
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
