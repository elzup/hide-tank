import * as React from 'react'

import { State } from '../../types'

import { recording } from '../SpeechArea/operations'

import { connect } from 'react-redux'
import SpeechArea from '../SpeechArea'

export interface Actions {
  recording: () => void
}
type Props = Actions

class MainPage extends React.Component<Props> {
  componentDidMount() {
    this.props.recording()
  }
  render() {
    return (
      <div>
        <h4>SpeechArea</h4>
        <SpeechArea />
      </div>
    )
  }
}

const mapStateToProps = (appState: State) => ({})

export default connect(
  mapStateToProps,
  { recording }
)(MainPage)
