import _ from 'lodash'
import * as React from 'react'
import { Stage } from 'react-pixi-fiber'

import { Point } from 'pixi.js'
import {
  GameProgressState,
  GameState,
  Stage as GameStage,
} from '../../../types'
import PlayersLayer from './PlayersLayer'
import StageLayer from './StageLayer'

type Props = {
  game: GameState
  stage: GameStage
}

const GameProgressScreen: React.SFC<{
  game: GameProgressState
  stage: GameStage
}> = ({ game, stage }) => {
  const width = stage.cw * 24
  const height = stage.ch * 24
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  // 画面の比率が縦に長過ぎるか？
  // width / height > screenWidth / screenHeight
  const isHeightOver = width * screenHeight > screenWidth * height
  // console.log(isHeightOver ? '縦長' : '横長')
  const scale = isHeightOver ? screenWidth / width : screenHeight / height

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Stage
        width={screenWidth}
        height={screenHeight}
        scale={new Point(scale, scale)}
        options={{ backgroundColor: 0x10bb99 }}
      >
        <StageLayer stage={stage} />
        <PlayersLayer players={game.players} />
      </Stage>
    </div>
  )
}

const GameScreen: React.SFC<Props> = props => {
  const { game } = props
  if (game.processType === 'progress') {
    return <GameProgressScreen game={game} stage={props.stage} />
  } else {
    return <div>終了</div>
  }
}

export default GameScreen
