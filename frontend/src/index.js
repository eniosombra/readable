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
import postsOrder from './reducers/postOrderReducers'

const reducers = combineReducers({
    categories: categoriesReducers,
    posts: postsReducers,
    comments: commentsReducers,
    postsOrder : postsOrder
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = applyMiddleware(thunk)(createStore)(reducers, devTools)

ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>

    , document.getElementById('root')
)

serviceWorker.unregister();
