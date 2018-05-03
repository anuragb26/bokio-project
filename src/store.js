import { createStore, applyMiddleware} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const initialState = {}
const middleware = [
  thunk,
  routerMiddleware(history)
]

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
)

export default store