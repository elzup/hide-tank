import * as React from 'react'
import { Loop, Stage } from 'react-game-kit'

import { GameState } from '../../../../types'

type Props = {
  game: GameState
}

class GameScreen extends React.Component<Props> {
  context: any

  componentDidMount() {
    this.context.loop.subscribe(this.update)
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update)
  }

  update() {
    // tick logic
  }

  render() {
    const { game } = this.props
    return (
      <Loop>
        <Stage>{game.processType}</Stage>
      </Loop>
    )
  }
}

export default GameScreen
