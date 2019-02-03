import * as React from 'react'

import { connect } from 'react-redux'
import { moveRandomGamePage } from '../App/operations'

type Props = {
  title: string
  onClick: () => void
}

class MainPage extends React.Component<Props> {
  componentDidMount() {
    // this.props.recording()
  }

  render() {
    return (
      <div>
        <h4>Test:SpeechArea</h4>
        <p>{this.props.title}</p>
        <button onClick={this.props.onClick}>ゲームを始める</button>
      </div>
    )
  }
}

const ms = () => {
  return {
    title: '時雨',
    // time: db.time,
  }
}

export default connect(
  ms,
  { onClick: moveRandomGamePage }
)(MainPage)
