import _ from 'lodash'
import config from '../../config'
import { Cell, Player, ThunkAction } from '../../types'
import { radian2xy, round01 } from '../../utils'
import { getControl } from '../Control/selectors'
import { updateGameState } from '../Game/actions'
import { emitUpdate } from '../Game/operations'
import { getCell } from '../Stage/selectors'
import { receivePlayer, updatePlayer } from './actions'
import { getMyPlayer } from './selectors'

const speedTypeRate: { [speedType: string]: number } = {
  stop: 0,
  walk: 2,
  run: 4,
}

function collisionR(r, x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx * dx + dy * dy >= r * r
}

function collisionCellPlayer(nsx: number, nsy: number, cell: Cell): boolean {
  if (cell.type !== 'wall') {
    return false
  }
  const r = config.cellSize / 2

  const x = cell.position.cx * config.cellSize
  const y = cell.position.cx * config.cellSize
  const col = collisionR.bind(null, r, nsx, nsy)
  return (
    col(x + r, y + r) ||
    col(x - r, y + r) ||
    col(x - r, y - r) ||
    col(x + r, y - r)
  )
}

export function loopPlayers(): ThunkAction {
  return async (dispatch, getState) => {
    const control = getControl(getState())
    const { moveStick } = control
    if (!moveStick.active) {
      return
    }
    const { radian, speedType } = moveStick
    if (speedType !== 'stop') {
      const state = getState()
      const player = getMyPlayer(getState())
      if (!player) {
        return
      }
      const speedRate = speedTypeRate[speedType] || 0
      const { x, y } = radian2xy(radian)
      const osx = player.position.sx
      const osy = player.position.sy
      const dsx = x * speedRate
      const dsy = y * speedRate
      const nsx = osx + dsx
      const nsy = osy + dsy
      // 古いセル座標
      const ocx = Math.floor(osx / config.cellSize)
      const ocy = Math.floor(osy / config.cellSize)
      // 新しいセル座標
      const ncxpre = nsx + (round01(x) * config.cellSize) / 2
      const ncx = Math.floor(ncxpre / config.cellSize)
      const ncypre = nsy + (round01(y) * config.cellSize) / 2
      const ncy = Math.floor(ncypre / config.cellSize)
      console.log({ ocx, ocy })
      const nextCellX = getCell(state, ocy, ncx)
      const nextCellY = getCell(state, ncy, ocx)
      const nextCellXY = getCell(state, ncy, ncx)
      // const collision = collisionCellPlayer(ncxpre, ncypre, nextCellXY)

      const sx = nextCellX.type === 'wall' ? osx : nsx
      const sy = nextCellY.type === 'wall' ? osy : nsy

      const newPlayer: Player = {
        ...player,
        radian,
        position: { sx, sy },
      }
      emitUpdate({
        player: _.pick(player, ['id', 'position', 'hp']),
        bullets: [],
      })
      await dispatch(updatePlayer(newPlayer))
    }
  }
}

const playerPosition = {
  cx: 27,
  cy: 37,
}

const enemyPosition = {
  cx: 27,
  cy: 37,
}

export function createPlayer(id: string, isMe: boolean): ThunkAction {
  return async (dispatch, getState) => {
    const cellPosition = isMe ? playerPosition : enemyPosition
    const player: Player = {
      id,
      position: {
        sx: config.cellSize * cellPosition.cx + config.cellSize / 2,
        sy: config.cellSize * cellPosition.cy + config.cellSize / 2,
      },
      cellPosition,
      wepon: {
        weponId: 0,
        amount: 3,
        bulletIds: [],
      },
      vision: {
        pr: config.cellSize * 20,
      },
      hp: 10,
      speedType: 'stop',
      radian: 0,
      speed: 0,
    }
    dispatch(receivePlayer(player))
    if (isMe) {
      dispatch(updateGameState({ playerId: id }))
    } else {
      dispatch(updateGameState({ enemyId: id }))
    }
  }
}
