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
  myPlayer: Player | undefined
  bullets: Bullet[]
}

const GameProgressScreen = ({ myPlayer, stage, players, bullets }: Props) => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  // 画面の比率が縦に長過ぎるか？
  // width / height > screenWidth / screenHeight

  const isHeightOver = screenWidth < aspectRate * screenHeight

  // 16:9 = w:h
  // w = 1
  // h = 16:9
  // console.log(isHeightOver ? '縦長' : '横長')
  const rate = isHeightOver ? 1 / aspectRate : aspectRate
  const viewSize = isHeightOver
    ? {
        width: screenWidth,
        height: screenWidth * rate,
      }
    : {
        width: screenHeight * rate,
        height: screenHeight,
      }

  const scale = viewSize.width / 400
  if (!myPlayer) {
    return <span>接続中</span>
  }

  // console.log({ scale, viewSize })

  return (
    <div
      style={{
        background: '#464646',
        display: 'grid',
        height: `100vh`,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: `${viewSize.width}px`,
          height: `${viewSize.height}px`,
        }}
      >
        <Stage
          width={viewSize.width}
          height={viewSize.height}
          position={
            new Point(
              -myPlayer.position.sx * scale + viewSize.width / 2,
              -myPlayer.position.sy * scale + viewSize.height / 2
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
    </div>
  )
}
export default GameProgressScreen
