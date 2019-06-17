import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import CommentForm from './CommentForm'
import { searchPosts, searchPostById, searchPostsByCategory, votePost, deletePost } from '../actions/postsAction'
import { searchCommentsByPost, voteComment, deleteComment } from '../actions/commentsAction'
import { capitalize, formatDateTime } from '../helper/helper'
import iconLike from '../assets/like.png'
import iconUnlike from '../assets/unlike.png'
import iconEdit from '../assets/edit.png'
import iconTrash from '../assets/delete.png'
import iconComment from '../assets/add-comment.png'

class PostDetails extends Component {

  state = {
    showComment: false,
    redirectToHome: false,
    paramBody : '',
    paramAuthor : '',
    paramIdComment: '',
    operationComment: 'new'
  }

  componentDidMount() {
    const { postId } = this.props.match.params
    this.props.searchPostById(postId)
    this.props.searchCommentsByPost(postId)
  }

  toggleCommentForm = (option, operation) => {
    this.setState({ showComment: !option, operationComment: operation })
  }

  handleDeletePost = (postx) => {
    this.props.deletePost(postx)
    this.setState({ redirectToHome: true })
  }

  setShowCommentForm(booleanValue, operation, body, author, id) {
    this.setState({ 
      showComment: booleanValue, 
      operationComment: operation, 
      paramBody: body, 
      paramAuthor: author, 
      paramIdComment: id 
    })
  }

  isInvalidObject(obj) {
    return JSON.stringify(obj) ==='{}'
  }

  render() {
    if (this.state.redirectToHome) return <Redirect to={'/'} />

    if (this.isInvalidObject(this.props.post)) return <Redirect to={'/notfound'} />

    const { post, votePost, comments, voteComment, deleteComment } = this.props
    const { showComment } = this.state

    return (
      <div>
        {post && (
          <div className="divPost">
            <h2>{post.title}</h2>
            <p><b>Author:</b> {capitalize(post.author)}  <b>Category:</b> {capitalize(post.category)}  <b>Sent:</b> {formatDateTime(post.timestamp)}</p>
            <p><b>Comment:</b> {post.commentCount}  <b>Vote Score:</b> {post.voteScore} </p>
            <p>{post.body}</p>

            <div className="action-button">
              <Link to={`/post/edit/${post.id}`}>
                <img src={iconEdit} title="Edit Post" alt="Edit Post" />
              </Link>
              <img src={iconLike} onClick={() => votePost(post.id, 'upVote')} title="Vote UP" alt="Vote UP" />
              <img src={iconUnlike} onClick={() => votePost(post.id, 'downVote')} title="Vote DOWN" alt="Vote DOWN" />
              <img src={iconTrash} onClick={() => this.handleDeletePost(post)} title="Delete Post" alt="Delete Post" />
              <img src={iconComment} onClick={() => this.toggleCommentForm(showComment, 'new')} title="Add Comment" alt="Add Comment" />
            </div>

            <hr />
            {this.state.showComment && (
              <div>
                <CommentForm post={post}
                  callbackParent={(bValue) => this.setShowCommentForm(bValue, 'new', this.state.paramBody, this.state.paramAuthor)}
                  comments={comments}
                  operation={this.state.operationComment}
                  body={this.state.paramBody}
                  author={this.state.paramAuthor}
                  idComment={this.state.paramIdComment}
                  />
              </div>
            )}

            {!this.state.showComment && (
              <div className="divComment">
                <h3>List of Comments (amount: {comments.length})</h3>
                {post && comments.length > 0 &&
                  comments.map(comment => (
                    <div key={comment.id} className="divListComment">
                      <p><b>Author:</b> {comment.author}  <b>Sent:</b> {formatDateTime(comment.timestamp)}   <b>Vote Score:</b> {comment.voteScore}</p>
                      <p>{comment.body}</p>
                      <div className="action-button">
                        <img src={iconEdit} onClick={() => this.setShowCommentForm(true, 'edit', comment.body, comment.author, comment.id)} title="Edit Comment" alt="Edit Comment" />
                        <img src={iconLike} onClick={() => voteComment(comment.id, 'upVote')} title="Vote UP" alt="Vote UP" />
                        <img src={iconUnlike} onClick={() => voteComment(comment.id, 'downVote')} title="Vote DOWN" alt="Vote DOWN" />
                        <img src={iconTrash} onClick={() => deleteComment(comment)} title="Delete Comment" alt="Delete Comment" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }) => ({ post: posts && posts[0], comments })
const mapDispatchToProps = dispatch => bindActionCreators({ searchPosts, searchPostById, searchPostsByCategory, votePost, searchCommentsByPost, voteComment, deletePost, deleteComment }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
