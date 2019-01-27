import * as React from 'react'
import MainPage from '../MainPage'

export interface Actions {}

type Props = {}

const App: React.SFC<Props> = props => {
  return (
    <div>
      <MainPage />
    </div>
  )
}

export default App
