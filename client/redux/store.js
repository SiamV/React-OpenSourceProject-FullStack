import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import loginReducer from "./reducers/loginReducer.js";
import toursReducer from "./reducers/toursReducer.js";
import textEditorReducer from "./reducers/textEditorReducer.js";
import orderReducer from "./reducers/orderReducer.js";


let reducersStack = combineReducers({
    login: loginReducer,
    tours: toursReducer,
    editor: textEditorReducer,
    orders: orderReducer
})

//connect redux chrome extension. delete after develop
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducersStack, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;

// store without redux chrome extension
// let store = createStore(reducersStack, applyMiddleware(thunkMiddleware));