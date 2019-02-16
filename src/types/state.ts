import { State as Game } from '../store/Game/reducer'
import { State as System } from '../store/System/reducer'

export type AppState = {
  System: System
  Game: Game
}
