import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid'

import '../App.css'
import { addComment, updateComment } from '../actions/commentsAction'
import iconSave from '../assets/save.png'
import iconCancel from '../assets/cancel.png'

class CommentForm extends Component {

   state = {
      body: (this.props.comments ? this.props.comments.body : '') || '',
      author: (this.props.comments ? this.props.comments.author : '') || '',
      invalidField: false
   }

   addComment = (post) => {
      if (this.isEmptyField()) {
         this.setState({ invalidField: true })
      } else {
         const { addComment } = this.props
         let newRecord = {
            id: uuid().split('-').join(''),
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: post.id
         }
         addComment(newRecord)
         this.props.callbackParent(false)
         this.setState({ invalidField: false })
      }
   }

   handleChange = (event) => {
      this.setState({ [event.target.id]: event.target.value })
   }

   isEmptyField = () => {
      return this.state.body.length === 0 || this.state.author.length === 0 ? true : false
   }

   render() {
      const { post } = this.props
      return (
         <div className="divComment">
            <h3>New Comment</h3>
            <br />
            <b>Comment:</b>
            <input id="body" type="text" value={this.state.body} onChange={this.handleChange} />

            <b> Author:</b>
            <input id="author" type="text" value={this.state.author} onChange={this.handleChange} />
            <br />
            <br />

            {this.state.invalidField && (
               <p><b>Required information. Please complete all fields!</b></p>
            )}

            <div className="action-button">
               <img src={iconSave} onClick={() => this.addComment(post)} title="Save" alt="Save" />
               <img src={iconCancel} onClick={() => this.props.callbackParent(false)} title="Cancel" alt="Cancel" />
               <hr />
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addComment, updateComment }, dispatch)
export default connect(null, mapDispatchToProps)(CommentForm)
