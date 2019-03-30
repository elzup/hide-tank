import _ from 'lodash'
import * as React from 'react'
import { Sprite } from 'react-pixi-fiber'

import { Texture } from 'pixi.js'
import bulletImg from '../../../components/res/bullet.png'
import { Bullet } from '../../../types'

type Props = {
  bullets: Bullet[]
}

const BulletLayer = (props: Props) => {
  const { bullets } = props
  return (
    <>
      {bullets.map(bullet => (
        <Sprite
          key={bullet.id}
          texture={Texture.fromImage(bulletImg)}
          x={bullet.position.sx}
          y={bullet.position.sy}
          // rotation={-bullet.radian + Math.PI / 2}
        />
      ))}
    </>
  )
}

export default BulletLayer
