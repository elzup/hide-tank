import { State as Control } from '../store/Control/reducer'
import { State as Game } from '../store/Game/reducer'
import { State as PlayerById } from '../store/PlayerById/reducer'
import { State as Stage } from '../store/Stage/reducer'
import { State as System } from '../store/System/reducer'

export type AppState = {
  System: System
  Stage: Stage
  Game: Game
  PlayerById: PlayerById
  Control: Control
}
