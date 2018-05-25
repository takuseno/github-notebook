import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import api from './middlewares/api'
import App from './containers/App'
import reducers from './reducers'

const store = applyMiddleware(
  api, thunk
)(createStore)(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
