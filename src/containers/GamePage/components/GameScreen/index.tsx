import _ from 'lodash'
import * as React from 'react'
import { Sprite, Stage } from 'react-pixi-fiber'

import { Texture } from 'pixi.js'
import cellEmpty from '../../../../components/res/cell-empty.png'
import cellWall from '../../../../components/res/cell-wall.png'
import {
  GameProgressState,
  GameState,
  Stage as GameStage,
} from '../../../../types'

type Props = {
  game: GameState
}

const Background: React.SFC<{ stage: GameStage }> = ({ stage }) => {
  return (
    <>
      {_.map(stage.cells, lineCells =>
        _.map(lineCells, cell => (
          <Sprite
            key={cell.id}
            texture={Texture.fromImage(cellWall)}
            x={cell.position.cx * 24}
            y={cell.position.cy * 24}
          />
        ))
      )}
    </>
  )
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
      <Background stage={game.stage} />
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
