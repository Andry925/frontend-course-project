import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {ComposeWithDevTools} from 'redux-devtools-extension'
import { productListReducer } from './reducers/productReducers'

const reducer = combineReducers({
  productList: productListReducer
})

const initialState = {

}
const middleware = [thunk]

const store = createStore(reducer, initialState, ComposeWithDevTools(applyMiddleware(...middleware)))

export default store