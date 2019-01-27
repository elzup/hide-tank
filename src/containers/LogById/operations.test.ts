import { Log } from '../../types'
import { calcLog } from './operations'

test('calLog', () => {
  const oldLog: Log = {
    id: 'id',
    count: 2,
    confidentSum: 2,
    confidentAverage: 1,
    point: 5,
  }
  expect(calcLog(oldLog, 10, 28)).toMatchInlineSnapshot(`
Object {
  "confidentAverage": 10,
  "confidentSum": 30,
  "count": 3,
  "id": "id",
  "point": 15,
}
`)
})
