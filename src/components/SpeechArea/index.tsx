import moment from 'moment'
import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GraphData, GraphType } from '../../types'

export type Props = {
  graphData: GraphData
  lastText: string
  selectedGraph: GraphType
  onSelectGraph: (string: GraphType) => any
}

const SpeechArea: React.SFC<Props> = (props: Props) => {
  if (props.graphData.length === 0) {
    return <p>loading...</p>
  }
  return (
    <div>
      <div>
        <p>文字起こし: {props.lastText}</p>
        <BarChart width={730} height={250} data={props.graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={['auto', 'maxValue']}
            tickFormatter={v => moment(v).format('HH:mm')}
          />
          <YAxis dataKey="point" />
          <Tooltip labelFormatter={v => moment(v).format('HH:mm')} />

          <Legend />
          <Bar dataKey="point" fill="#8884d8" />
        </BarChart>
      </div>

      <button onClick={() => props.onSelectGraph('3hour')}>3hour</button>
      <button onClick={() => props.onSelectGraph('1hour')}>1hour</button>
      <button onClick={() => props.onSelectGraph('30min')}>30min</button>
    </div>
  )
}

export default SpeechArea
