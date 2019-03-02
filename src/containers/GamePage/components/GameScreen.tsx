import _ from 'lodash'
import * as React from 'react'
import { Sprite, Stage } from 'react-pixi-fiber'

import {
  Cell,
  GameProgressState,
  GameState,
  Stage as GameStage,
} from '../../../types'
import PlayersLayer from './PlayersLayer'
import StageLayer from './StageLayer'

type Props = {
  game: GameState
}

const GameProgressScreen: React.SFC<{
  game: GameProgressState
}> = ({ game }) => {
  return (
    <Stage
      width={game.stage.cw * 24}
      height={game.stage.ch * 24}
      options={{ backgroundColor: 0x10bb99 }}
    >
      <StageLayer stage={game.stage} />
      <PlayersLayer players={game.players} />
    </Stage>
  )
}

const GameScreen: React.SFC<Props> = props => {
  const { game } = props
  if (game.processType === 'progress') {
    return <GameProgressScreen game={game} />
  } else {
    return <div>終了</div>
  }
}

export default GameScreen
