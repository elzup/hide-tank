import * as React from 'react'

import { connect } from 'react-redux'

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

export default connect(
  db => {
    return {
      title: '時雨',
      // time: db.time,
    }
  },
  {}
)(MainPage)
