import React from 'react'
import Profile from './Profile'
import MainPanel from './MainPanel'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [
        { id: 1, name: 'Arnupharp Viratanapanu', screenName: 'topscores', tweetText: 'Hello World' },
        { id: 2, name: 'Arnupharp Viratanapanu', screenName: 'topscores', tweetText: 'I am handsome' },
        { id: 3, name: 'Arnupharp Viratanapanu', screenName: 'topscores', tweetText: 'I like pop music' },
      ],
    }
  }

  render() {
    return (
      <div>
        <Profile />
        <MainPanel tweets={this.state.tweets} />
      </div>
    )
  }
}

export default App
