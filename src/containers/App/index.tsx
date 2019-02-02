import * as React from 'react'
import MainPage from '../MainPage'

export interface Actions {}

type Props = {}

const App: React.SFC<Props> = props => {
  return (
    <div>
      <MainPage
        onClick={() => {
          // ランダムハッシュ生成
          // `/game/{hash}` ページ移動
          // player1 `/game/{hash}` GamePageComponent {hash}
          // player2 `/game/{hash}` GamePageComponent {hash}
        }}
      />
    </div>
  )
}

export default App
