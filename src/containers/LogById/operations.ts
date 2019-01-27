import moment from 'moment'
import { Log, ThunkAction } from '../../types'
import { updateLog } from './actions'
import { getLogOrCreateBy } from './selectors'

export const saveLog = (text: string, confidence: number): ThunkAction => {
  return async (dispatch, getState) => {
    const now = Date.now()
    const min = moment(now).format('YYYY-MM-DDTHH:mm')
    const log = getLogOrCreateBy(getState(), min)

    await dispatch(updateLog([calcLog(log, text.length, confidence)]))
  }
}

export const calcLog = (log: Log, point: number, confident: number): Log => {
  const count = log.count + 1
  const confidentSum = log.confidentSum + confident
  return {
    ...log,
    count,
    confidentSum,
    confidentAverage: confidentSum / count,
    point: log.point + point,
  }
}
