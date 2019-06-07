import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { searchPosts, searchPostsByCategory, votePost, deletePost } from '../actions/postsAction'
import { capitalize } from '../helper/helper'

class PostList extends Component {

    componentDidMount() {
        const { category } = this.props.match.params

        if (category === undefined) {
            this.props.searchPosts()
        } else {
            this.props.searchPostsByCategory(category)
        }
    }

    componentWillReceiveProps(nextProps) {
        const { category } = this.props.match.params
        const nextCategory = nextProps.match.params.category
        if (category !== nextCategory) {
            this.props.searchPostsByCategory(nextCategory)
        }
    }

    render() {
        const { category } = this.props.match.params
        const { posts } = this.props
        const { votePost } = this.props
        const { deletePost } = this.props

        return (
            <div>
                <h1>PostList Component</h1>
                <h3>{category}</h3>

                {posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>Author: {capitalize(post.author)} || Vote Score: {post.voteScore} || Comment: {post.commentCount} || Category: {post.category.toUpperCase()}</p>

                        <Link to={`/${post.category}/${post.id}`}><button>View</button></Link>
                        <Link to={`/post/edit/${post.id}`}><button>Edit</button></Link>
                        <button onClick={() => votePost(post.id, 'upVote')}>VoteUp</button>
                        <button onClick={() => votePost(post.id, 'downVote')}>VoteDown</button>
                        <button onClick={() => deletePost(post)}>Delete</button>

                        <p>------------------------------------------------------</p>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = posts => posts
const mapDispatchToProps = dispatch => bindActionCreators({ searchPosts, searchPostsByCategory, votePost, deletePost }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostList)

