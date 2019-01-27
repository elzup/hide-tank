import moment from 'moment'
import { GraphData, Log, ThunkAction } from '../../types'
import { getLogOrCreateBy } from '../LogById/selectors'
import { updateGraphData } from './actions'

export const updateGraph = (): ThunkAction => {
  return (dispatch, getState) => {
    const m = moment()
      .subtract(3, 'hour')
      .startOf('minute')
    const end = moment()
    const hourAgo = moment().subtract(1, 'hour')
    const min30Ago = moment().subtract(30, 'minute')
    const dataH3 = [] as GraphData
    const dataH1 = [] as GraphData
    const dataM30 = [] as GraphData
    const state = getState()
    while (m.isBefore(end)) {
      const id = m.format('YYYY-MM-DDTHH:mm')
      const log = getLogOrCreateBy(state, id)
      const newLog = {
        point: log.point,
        confidentAverage: log.confidentAverage,
        timestamp: m.unix() * 1000,
        timestampStr: m.format('HH:mm'),
      }
      dataH3.push(newLog)
      if (m.isAfter(hourAgo)) {
        dataH1.push(newLog)
        if (m.isAfter(min30Ago)) {
          dataM30.push(newLog)
        }
      }
      m.add(1, 'minutes')
    }
    dispatch(updateGraphData({ id: '3hour', data: dataH3 }))
    dispatch(updateGraphData({ id: '1hour', data: dataH1 }))
    dispatch(updateGraphData({ id: '30min', data: dataM30 }))
  }
}
