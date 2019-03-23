import _ from 'lodash'
import * as React from 'react'

import { GameState } from '../../../types'
import GameProgressScreenContainer from '../GameProgressScreenContainer'

type Props = {
  game: GameState
}

const GameScreen: React.SFC<Props> = props => {
  const { game } = props
  if (game.processType === 'progress') {
    return <GameProgressScreenContainer />
  } else {
    return <div>終了</div>
  }
}

export default GameScreen
