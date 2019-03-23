import * as React from 'react'

import { connect } from 'react-redux'
import { RouteComponentProps, RouterProps } from 'react-router'
import { windowControlInit } from '../../store/Control/operations'
import { setupLoop } from '../../store/Game/operations'
import { getGameState } from '../../store/Game/selectors'
import { getStage } from '../../store/Stage/selectors'
import { GameState, Stage, State } from '../../types'
import GameScreen from './components/GameScreen'

type Props = {
  game: GameState
  stage: Stage
  room: string
  windowControlInit: () => void
  setupLoop: () => void
}

const toj = (a: Object) => JSON.stringify(a, null, '\t')

class GamePage extends React.Component<Props> {
  componentDidMount() {
    this.props.windowControlInit()
    this.props.setupLoop()
  }

  render() {
    const { props } = this
    return (
      <div>
        {/* <h4>ゲームページです</h4>
        <h5>ルーム: {props.room}</h5> */}
        <GameScreen game={props.game} stage={props.stage} />
      </div>
    )
  }
}

type OProps = RouteComponentProps<{ room: string }>
// OwnProps
// <GamePage hoge="" />
type SProps = {
  game: GameState
  stage: Stage
}
type DProps = {
  setupLoop: () => void
  windowControlInit: () => void
}

export default connect<SProps, DProps, OProps, State>(
  (state, ownProps) => ({
    game: getGameState(state),
    stage: getStage(state),
    room: ownProps.match.params.room,
  }),
  { windowControlInit, setupLoop }
)(GamePage)
