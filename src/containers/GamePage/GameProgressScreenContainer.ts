import { connect } from 'react-redux'
import { getAllBullets } from '../../store/BulletById/selectors'
import { windowControlInit } from '../../store/Control/operations'
import { setupLoop } from '../../store/Game/operations'
import { getAllPlayers } from '../../store/PlayerById/selectors'
import { getStage } from '../../store/Stage/selectors'
import { Bullet, Player, Stage, State } from '../../types'
import GameProgressScreen from './components/GameProgressScreen'

type OProps = {}
type SProps = {
  stage: Stage
  players: Player[]
  bullets: Bullet[]
}
type DProps = {}

const GameProgressScreenContainer = connect<SProps, DProps, OProps, State>(
  state => ({
    stage: getStage(state),
    players: getAllPlayers(state),
    bullets: getAllBullets(state),
  }),
  { windowControlInit, setupLoop }
)(GameProgressScreen)

export default GameProgressScreenContainer
