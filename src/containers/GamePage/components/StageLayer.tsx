import _ from 'lodash'
import * as React from 'react'
import { Sprite } from 'react-pixi-fiber'

import { Texture } from 'pixi.js'
import cellEmpty from '../../../components/res/cell-empty.png'
import cellWall from '../../../components/res/cell-wall.png'
import { Cell, Stage as GameStage } from '../../../types'

const CellSprite = ({ cell }: { cell: Cell }) => {
  switch (cell.type) {
    case 'empty':
      return (
        <Sprite
          texture={Texture.fromImage(cellEmpty)}
          x={cell.position.cx * 24}
          y={cell.position.cy * 24}
        />
      )
    case 'wall':
      return (
        <Sprite
          texture={Texture.fromImage(cellWall)}
          x={cell.position.cx * 24}
          y={cell.position.cy * 24}
        />
      )
  }
}

type Props = { stage: GameStage }

const StageLayer: React.SFC<Props> = ({ stage }) => {
  return (
    <>
      {_.flatten(
        _.map(stage.cells, lineCells =>
          _.map(lineCells, cell => <CellSprite key={cell.id} cell={cell} />)
        )
      )}
    </>
  )
}

export default StageLayer
