import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid'

import '../App.css'
import { addComment, updateComment } from '../actions/commentsAction'
import iconSave from '../assets/save.png'
import iconCancel from '../assets/cancel.png'
import { capitalize } from '../helper/helper'

class CommentForm extends Component {

   state = {
      body: '',
      author: '',
      invalidField: false
   }

   componentDidMount() {
      if (this.props.operation === 'new') {
         this.clearFields()
      } else {
         const { body, author } = this.props
         this.populateFields(body, author)
      }
   }

   handleSaveComment = (post, operation) => {
      if (this.isEmptyField()) {
         this.setState({ invalidField: true })
      } else {
         const { addComment, updateComment, idComment } = this.props

         const idRecord = (operation === 'new')
            ? uuid().split('-').join('') : idComment

         let record = {
            id: idRecord,
            timestamp: Date.now(),
            body: this.state.body,
            author: this.state.author,
            parentId: post.id
         }

         if (operation === 'new') {
            addComment(record)
         }
         else {
            updateComment(record)
         }

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

   populateFields = (body, author) => {
      this.setState({
         body: body,
         author: author
      })
   }

   clearFields = () => {
      this.setState({
         body: '',
         author: ''
      })
   }


   render() {
      const { post, operation } = this.props

      return (
         <div className="divComment">
            <h3>{capitalize(operation)} Comment</h3>
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
               <img src={iconSave} onClick={() => this.handleSaveComment(post, operation)} title="Save" alt="Save" />
               <img src={iconCancel} onClick={() => this.props.callbackParent(false)} title="Cancel" alt="Cancel" />
               <hr />
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addComment, updateComment }, dispatch)
export default connect(null, mapDispatchToProps)(CommentForm)
