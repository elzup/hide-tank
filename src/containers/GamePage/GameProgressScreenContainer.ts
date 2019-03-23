import { connect } from 'react-redux'
import { windowControlInit } from '../../store/Control/operations'
import { setupLoop } from '../../store/Game/operations'
import { getPlayers } from '../../store/PlayerById/selectors'
import { getStage } from '../../store/Stage/selectors'
import { Player, Stage, State } from '../../types'
import GameProgressScreen from './components/GameProgressScreen'

type OProps = {}
type SProps = {
  stage: Stage
  players: Player[]
}
type DProps = {}

const GameProgressScreenContainer = connect<SProps, DProps, OProps, State>(
  state => ({
    stage: getStage(state),
    players: getPlayers(state),
  }),
  { windowControlInit, setupLoop }
)(GameProgressScreen)

export default GameProgressScreenContainer
