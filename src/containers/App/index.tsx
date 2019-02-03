import createHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { Route, Router, Switch } from 'react-router'
import GamePage from '../GamePage'
import MainPage from '../MainPage'

export const history = createHistory()
export interface Actions {}

type Props = {}

const App: React.SFC<Props> = props => {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path={'/'} component={MainPage} />
          <Route exact path="/game/:room" component={GamePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
