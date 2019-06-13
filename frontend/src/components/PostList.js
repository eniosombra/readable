import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { searchPosts, searchPostsByCategory, votePost, deletePost } from '../actions/postsAction'
import { sortPosts } from '../actions/postOrderActions'
import { capitalize, formatDateTime, sortBy } from '../helper/helper'
import './PostList.css'
import iconLike from '../assets/like.png'
import iconUnlike from '../assets/unlike.png'
import iconEdit from '../assets/edit.png'
import iconTrash from '../assets/delete.png'
import iconView from '../assets/view.png'
import iconOrderByDateTime from '../assets/order-by-time.png'
import iconOrderByScore from '../assets/order-by-score.png'

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

    sortByScore = (order) => {
        this.props.sortPosts(order)
    }

    render() {
        const { category } = this.props.match.params
        const { posts } = this.props
        const { votePost } = this.props
        const { deletePost } = this.props

        return (
            <div>
                <header id="main-header">
                    <div className="header-submenu">
                        <h3>List of Posts: <b> {category ? category.toUpperCase() + ' ' : ' ALL '} </b></h3>

                        Sort by:
                        <img src={iconOrderByScore} onClick={() => this.sortByScore('SCORE_ORDER')} title="Sort by Score" alt="Sort by Score" />
                        <img src={iconOrderByDateTime} onClick={() => this.sortByScore('TIMESTAMP_ORDER')} title="Sort by Time" alt="Sort by Time" />
                    </div>
                </header>

                {posts.map(post => (
                    <div key={post.id} className="divPost">
                        <h2>{post.title}</h2>
                        <p><b>Author:</b> {capitalize(post.author)}  <b>Category:</b> {capitalize(post.category)}  <b>Sent:</b> {formatDateTime(post.timestamp)}</p>

                        <p><b>Comment:</b> {post.commentCount}  <b>Vote Score:</b> {post.voteScore} </p>

                        <div className="action-button">
                            <Link to={`/${post.category}/${post.id}`}>
                                <img src={iconView} title="View Detail" alt="View Detail" />
                            </Link>

                            <Link to={`/post/edit/${post.id}`}>
                                <img src={iconEdit} title="Edit Post" alt="Edit Post" />
                            </Link>

                            <img src={iconLike} onClick={() => votePost(post.id, 'upVote')} title="Vote UP" alt="Vote UP" />
                            <img src={iconUnlike} onClick={() => votePost(post.id, 'downVote')} title="Vote DOWN" alt="Vote DOWN" />
                            <img src={iconTrash} onClick={() => deletePost(post)} title="Delete Post" alt="Delete Post" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = ({ posts, postsOrder }) => ({ posts: sortBy(posts && posts.slice(), postsOrder), })
const mapDispatchToProps = dispatch => bindActionCreators({ searchPosts, searchPostsByCategory, votePost, deletePost, sortPosts }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostList)

