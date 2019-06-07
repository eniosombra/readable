import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { searchPosts, votePost } from '../actions/postsAction'
import { capitalize } from '../helper/helper'

class Post extends Component {
    componentDidMount() {
        this.props.searchPosts()
    }

    render() {
        const { posts } = this.props
        const { votePost } = this.props

        return (
            <div>
                <div className="post">
                    <p><Link to="/teste">testRouter</Link></p>
                    <p><Link to="/postDetails">postDetails2</Link></p>

                    {posts.map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>Author: {capitalize(post.author)} || Vote Score: {post.voteScore} || Comment: {post.commentCount} || Category: {post.category.toUpperCase()}</p>
                            <button>View</button>
                            <button onClick={() => votePost(post.id, 'upVote')}>VoteUp</button>
                            <button onClick={() => votePost(post.id, 'downVote')}>VoteDown</button>
                            <p><Link to="/postDetails">postDetails</Link></p>
                            <p><Link to={`/${post.category}/${post.id}`}>postDetails OK</Link></p>
                            
                            <p>----------------------</p>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}

const mapStateToProps = posts => posts
const mapDispatchToProps = dispatch => bindActionCreators({ searchPosts, votePost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Post)
