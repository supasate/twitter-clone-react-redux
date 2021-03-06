import types from './types'

const addTweetInProgress = () => ({
  type: types.ADD_TWEET_IN_PROGRESS,
})

const addTweetSuccess = () => ({
  type: types.ADD_TWEET_SUCCESS,
})

const addTweetFail = error => ({
  type: types.ADD_TWEET_FAIL,
  payload: error,
  error: true,
})

const addTweet = (name, username, tweetText, token) => (dispatch) => {
  dispatch(addTweetInProgress())

  const uri = `http://localhost:3000/api/Tweets?access_token=${token}`
  return fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      username,
      tweetText,
    }),
  })
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response.json()
  })
  .then((data) => {
    dispatch({
      type: types.ADD_TWEET,
      payload: {
        id: data.id,
        name: data.name,
        username: data.username,
        tweetText: data.tweetText,
        timestamp: data.timestamp,
      },
    })
    dispatch(addTweetSuccess())
  })
  .catch(error => dispatch(addTweetFail(error)))
}

const fetchInProgress = () => ({
  type: types.FETCH_TWEETS_IN_PROGRESS,
  payload: {},
})

const fetchSuccess = tweets => ({
  type: types.FETCH_TWEETS_SUCCESS,
  payload: {
    tweets,
  },
})

const fetchTweets = username => (dispatch) => {
  dispatch(fetchInProgress())

  let uri = 'http://localhost:3000/api/Tweets'
  if (username) {
    uri = `${uri}?filter={"where":{"username":"${username}"}}`
  }
  fetch(uri)
    .then(response => response.json())
    .then((tweets) => {
      dispatch(fetchSuccess(tweets))
    })
}

const fetchHomeFeed = token => (dispatch) => {
  dispatch(fetchInProgress())

  const uri = `http://localhost:3000/api/Tweets/homefeed?access_token=${token}`
  fetch(uri)
    .then(response => response.json())
    .then((tweets) => {
      dispatch(fetchSuccess(tweets))
    })
}

export {
  addTweet,
  addTweetInProgress,
  addTweetSuccess,
  addTweetFail,
  fetchInProgress,
  fetchSuccess,
  fetchTweets,
  fetchHomeFeed,
}
