import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {ComposeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({})

const initialState = {

}
const middleware = [thunk]

const store = createStore(reducer, initialState, ComposeWithDevTools(applyMiddleware(...middleware)))

export default store