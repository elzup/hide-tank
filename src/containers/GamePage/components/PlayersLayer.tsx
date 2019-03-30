import _ from 'lodash'
import * as React from 'react'
import { Sprite } from 'react-pixi-fiber'

import { Point, Texture } from 'pixi.js'
import playerImg from '../../../components/res/player.png'
import config from '../../../config'
import { Player } from '../../../types'

type Props = {
  players: Player[]
}

const PlayersLayer: React.SFC<Props> = props => {
  const { players } = props
  return (
    <>
      {players.map(player => (
        <Sprite
          key={player.id}
          texture={Texture.fromImage(playerImg)}
          x={player.position.sx}
          y={player.position.sy}
          pivot={new Point(config.cellSize / 2, config.cellSize / 2)}
          rotation={-player.radian + Math.PI / 2}
        />
      ))}
    </>
  )
}

export default PlayersLayer
