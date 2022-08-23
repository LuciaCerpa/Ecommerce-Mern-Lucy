import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import thunk from 'redux-thunk'

const finalReducer = combineReducers({
    rootReducer,
})

const initialState = {
    rootReducer: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("carItems")) : [],
    }
}

const middleware=[thunk];

const store = createStore(finalReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;