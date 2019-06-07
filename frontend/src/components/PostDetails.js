import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { searchPosts, searchPostById, searchPostsByCategory, votePost } from '../actions/postsAction'
import { searchCommentsByPost, voteComment } from '../actions/commentsAction'

import { capitalize, formatDateTime } from '../helper/helper'


class PostDetails extends Component {

    componentDidMount() {
        const { postId } = this.props.match.params
        this.props.searchPostById(postId)
        this.props.searchCommentsByPost(postId)

        //console.log('Id do POST: ' + postId)
    }

    render() {
        const { post, votePost, comments, voteComment } = this.props

        console.log(comments)

        return (
            <div>
                <h1>PostDetails</h1>

                {post && (
                    <div>
                        <h2>{post.title}</h2>
                        <p>Author: {capitalize(post.author)} || Vote Score: {post.voteScore} || Comment: {post.commentCount} || Category: {post.category.toUpperCase()}</p>
                        <p>{post.body}</p>
                        

                        <button onClick={() => votePost(post.id, 'upVote')}>VoteUp</button>
                        <button onClick={() => votePost(post.id, 'downVote')}>VoteDown</button>
                        <button>Add Comment</button>
                        <p>----------------------</p>
                    </div>
                )}

                <p>==================================================================</p>
                <h4>Amount of comments: {comments.length}</h4>
                {post && comments.length > 0 &&
                    comments.map(comment => (
                        <div key={comment.id}>
                            <p>***************coment*****************</p>
                            <p><b>Author:</b> {comment.author} || <b>Sent:</b> {formatDateTime(comment.timestamp)}  || <b>Vote Score:</b> {comment.voteScore}</p>
                            <p>{comment.body}</p>
                            <button onClick={() => voteComment(comment.id, 'upVote')}>VoteUp</button>
                            <button onClick={() => voteComment(comment.id, 'downVote')}>VoteDown</button>
                        </div>
                    ))}

                <br></br>
                <Link to="/"><button>***** VOLTAR *****</button></Link>
            </div>
        )
    }
}

const mapStateToProps = ({ posts, comments }) => ({ post: posts && posts[0], comments })

const mapDispatchToProps = dispatch => bindActionCreators({ searchPosts, searchPostById, searchPostsByCategory, votePost, searchCommentsByPost, voteComment }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
