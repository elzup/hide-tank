import _ from 'lodash'
import * as React from 'react'
import { Sprite } from 'react-pixi-fiber'

import { Point, Texture } from 'pixi.js'
import config from '../../../config'
import stageHeader from '../../../components/res/stage-header.png'
import { StageHeader } from '../../../types'

type Props = { header: StageHeader }

const HeaderLayer = React.memo(({ header }: Props) => {
  console.log('header layer draw')
  return (
    <>
      <Sprite texture={Texture.fromImage(stageHeader)} x={10024} y={10024} />
    </>
  )
})

export default HeaderLayer
