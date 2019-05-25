import { connect } from 'react-redux'
import { getAllBullets } from '../../store/BulletById/selectors'
import { windowControlInit } from '../../store/Control/operations'
import { getAllPlayers, getMyPlayer } from '../../store/PlayerById/selectors'
import { getStage } from '../../store/Stage/selectors'
import { Bullet, Player, Stage, State } from '../../types'
import GameProgressScreen from './components/GameProgressScreen'

type OProps = {}
type SProps = {
  stage: Stage
  players: Player[]
  bullets: Bullet[]
  myPlayer: Player | undefined
}
type DProps = {}

const GameProgressScreenContainer = connect<SProps, DProps, OProps, State>(
  state => ({
    stage: getStage(state),
    players: getAllPlayers(state),
    myPlayer: getMyPlayer(state),
    bullets: getAllBullets(state),
  }),
  { windowControlInit }
)(GameProgressScreen)

export default GameProgressScreenContainer
