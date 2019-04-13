import { AppState as _State } from './state'

import { AnyAction } from 'redux'
import { ThunkAction as _ThunkAction } from 'redux-thunk'
export type State = _State

export type ThunkAction = _ThunkAction<
  void | Promise<void>,
  State,
  undefined,
  AnyAction
>

export type System = {}

export type GameProcess = 'progress' | 'finish'

export type StagePosition = {
  sx: number
  sy: number
}

export type CellPosition = {
  cx: number
  cy: number
}

export type SpeedType = 'stop' | 'walk' | 'run'

type Wepon = {
  id: number
  bulletAmount: number
  rate: number
  // power: number
}

export type BulletVelosity = {
  base: number
  x: number
  y: number
  radian: number
}

export type Bullet = {
  id: number
  position: StagePosition
  velosity: BulletVelosity
  hp: number
  pr: number
}

export type Player = {
  id: number
  position: StagePosition
  cellPosition: CellPosition
  wepon: {
    weponId: number
    amount: number
    bulletIds: number[]
  }
  vision: {
    pr: number
  }
  hp: number // 10
  radian: number
  speedType: SpeedType
  speed: number
}

// position: { x, y }
// position
export type CellType = 'wall' | 'empty'
export type Cell = {
  id: string
  type: CellType
  position: CellPosition
  // playerIds: number[]
}

export type Stage = {
  cw: number
  ch: number
  cells: {
    [cy: number]: {
      [cx: number]: Cell
    }
  }
}

export type Position = {
  x: number
  y: number
}

export type MoveStick =
  | {
      touchId: number
      active: true
      startPosition: Position
      currentPosition: Position
      diffPosition: Position
      speedType: SpeedType
      radian: number
    }
  | { active: false }

export type Control = {
  moveStick: MoveStick
  bulletButton: {
    active: boolean
    touchId?: number
  }
}

// number, string, boolean, null, undefined
// Array<number>
// number[]
export type GameProgressState = {
  processType: 'progress'
  currentPlayerId: number
  timeLimit: number
}

export type GameFinishState = {
  processType: 'finish'
  winnerPlayerId: number
}

export type GameState = GameProgressState | GameFinishState
