import * as React from 'react'

import { connect } from 'react-redux'
import { RouteComponentProps, RouterProps } from 'react-router'
import { State } from '../../types'

type Props = {
  gameState: 'wait' | 'start'
  room: string
}

class GamePage extends React.Component<Props> {
  componentDidMount() {
    // this.props.recording()
  }

  render() {
    const { props } = this
    return (
      <div>
        <h4>ゲームページです</h4>
        <h5>ルーム: {props.room}</h5>
        <p>{props.gameState}</p>
      </div>
    )
  }
}

type OProps = RouteComponentProps<{ room: string }>
// OwnProps
// <GamePage hoge="" />
type SProps = {
  gameState: 'wait' | 'start'
}
type DProps = {}
export default connect<SProps, DProps, OProps, State>(
  (state, ownProps) => ({
    gameState: 'wait',
    room: ownProps.match.params.room,
  }),
  {}
)(GamePage)
