import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'
import Category from './components/Category'
import PostDetails from './components/PostDetails'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import CommentForm from './components/CommentForm'
import Header from './components/Header'
import NoFound from './components/NoFound'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Category />
        <Route exact path="/" component={PostList} />
        <Route exact path="/:category" component={PostList} />
        <Route exact path="/notfound" component={NoFound} />
        
        <Switch>
          <Route exact path="/post/new" component={PostForm} />
          <Route exact path="/post/edit/:postId" component={PostForm} />
          <Route exact path="/comment/new" component={CommentForm} />
          <Route exact path="/:category/:postId" component={PostDetails} />
        </Switch>
      </div>
    )
  }
}
