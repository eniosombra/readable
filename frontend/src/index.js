import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import categoriesReducers from './reducers/categoriesReducers'
import postsReducers from './reducers/postsReducers'
import commentsReducers from './reducers/commentsReducers'

const reducers = combineReducers({
    categories: categoriesReducers,
    posts: postsReducers,
    comments: commentsReducers
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(thunk)(createStore)(reducers, devTools)

/*
const store = createStore(
    reducers,
    applyMiddleware(thunk)
)
*/

ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>

    , document.getElementById('root')
)

serviceWorker.unregister();
