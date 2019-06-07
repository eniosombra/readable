import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Category from './components/Category'

import TestRouter from './components/TestRouter'
import PostDetails from './components/PostDetails'
import PostList from './components/PostList'
import PostForm from './components/PostForm'

export default class App extends Component {

  /*
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    ReadableAPI.getPosts().then(posts_state => {
      this.setState({
        posts_state: posts_state
      })
    })
  }
  */

/*
 <Route exact path='/postDetails' render={() => (
  <PostDetails texto='ENIO' />
)} />
*/

  render() {

    return (
      <div className="App">

        <Category />

        <Route exact path="/" component={PostList} />

        <Route exact path="/:category" component={PostList} />


        <Switch>

          <Route path="/post/new" component={PostForm}/>

          <Route path="/post/edit/:postId" component={PostForm}/>

          <Route path="/:category/:postId" component={PostDetails} />

          <Route exact path="/:teste/:teste2" component={TestRouter} />

        </Switch>


      </div>
    )
  }
}


