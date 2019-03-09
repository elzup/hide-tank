import * as React from 'react'

import { connect } from 'react-redux'
import { RouteComponentProps, RouterProps } from 'react-router'
import { windowControlInit } from '../../store/Game/operations'
import { getGameState } from '../../store/Game/selectors'
import { GameState, State } from '../../types'
import GameScreen from './components/GameScreen'

type Props = {
  game: GameState
  room: string
  windowControlInit: () => void
}

const toj = (a: Object) => JSON.stringify(a, null, '\t')

class GamePage extends React.Component<Props> {
  componentDidMount() {
    this.props.windowControlInit()
    // this.props.recording()
  }

  render() {
    const { props } = this
    return (
      <div>
        <h4>ゲームページです</h4>
        <h5>ルーム: {props.room}</h5>
        <GameScreen game={props.game} />
      </div>
    )
  }
}

type OProps = RouteComponentProps<{ room: string }>
// OwnProps
// <GamePage hoge="" />
type SProps = {
  game: GameState
}
type DProps = {}
export default connect<SProps, DProps, OProps, State>(
  (state, ownProps) => ({
    game: getGameState(state),
    room: ownProps.match.params.room,
  }),
  { windowControlInit }
)(GamePage)
