import _ from 'lodash'
import * as React from 'react'
import { Stage } from 'react-pixi-fiber'

import { Point } from 'pixi.js'
import config from '../../../config'
import { Bullet, Player, Stage as GameStage } from '../../../types'
import BulletLayer from './BulletsLayer'
import PlayersLayer from './PlayersLayer'
import StageLayer from './StageLayer'
const { aspectRate } = config

type Props = {
  stage: GameStage
  players: Player[]
  bullets: Bullet[]
}

const GameProgressScreen = ({ stage, players, bullets }: Props) => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  // 画面の比率が縦に長過ぎるか？
  // width / height > screenWidth / screenHeight

  const isHeightOver = screenWidth > aspectRate * screenHeight

  // console.log(isHeightOver ? '縦長' : '横長')
  const screenSize = isHeightOver
    ? {
        width: '100%',
        height: `${aspectRate * screenHeight}px`,
      }
    : {
        width: '100%',
        height: '100vh',
      }
  const scale = 2

  const player = players[0]
  return (
    <div style={{ ...screenSize, overflow: 'hidden' }}>
      <Stage
        width={screenWidth}
        height={screenHeight}
        position={
          new Point(
            -player.position.sx * scale + screenWidth / 2,
            -player.position.sy * scale + screenHeight / 2
          )
        }
        scale={new Point(scale, scale)}
        options={{ backgroundColor: 0x10bb99 }}
      >
        <StageLayer stage={stage} />
        <PlayersLayer players={players} />
        <BulletLayer bullets={bullets} />
      </Stage>
    </div>
  )
}
export default GameProgressScreen
