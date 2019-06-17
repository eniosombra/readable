import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid'

import { addPost, updatePost, searchPostById } from '../actions/postsAction'
import { capitalize } from '../helper/helper'
import iconSave from '../assets/save.png'
import iconCancel from '../assets/cancel.png'

class PostForm extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: '',
        invalidField: false,
        redirectToHome: false,
        operation: 'new'
    }

    componentDidMount() {
        const { postId } = this.props.match.params
        this.setOperation(postId)
        const { post } = this.props
        this.populateFields(post)
    }

    componentWillReceiveProps(nextProps) {
        const { postId } = this.props.match.params
        const nextPostId = nextProps.match.params.postId
        if (postId !== nextPostId) {
            this.setOperation(nextPostId)
        }
    }

    setOperation(postId) {
        if (postId !== undefined) {
            this.setState({ operation: 'update' })
        } else {
            this.setState({ operation: 'new' })
            this.clearFields()
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
    }

    populateFields = (post) => {
        this.setState({
            title: post ? post.title : '',
            body: post ? post.body : '',
            author: post ? post.author : '',
            category: post ? post.category : ''
        })
    }

    clearFields = () => {
        this.setState({
            title: '',
            body: '',
            author: '',
            category: ''
        })
    }

    isEmptyField = () => {
        return this.state.title.length === 0 ||
            this.state.author.length === 0 ||
            this.state.body.length === 0 ||
            this.state.category.length === 0
            ? true : false
    }

    handleAdd = () => {
        if (this.isEmptyField()) {
            this.setState({ invalidField: true, redirectToHome: false })
        } else {
            let newRecord = {}
            const { addPost, updatePost } = this.props

            const idRecord = (this.state.operation === 'new') ?
                uuid().split('-').join('') : this.props.post.id

            newRecord = {
                id: idRecord,
                title: this.state.title,
                body: this.state.body,
                author: this.state.author,
                category: this.state.category,
                timestamp: Date.now()
            }

            if (this.state.operation === 'new') {
                addPost(newRecord)
            }
            else {
                updatePost(newRecord)
            }

            this.clearFields()
            this.setState({ invalidField: false, redirectToHome: true })
        }
    }

    render() {
        if (this.state.redirectToHome) return <Redirect to={'/'} />

        const { operation } = this.state

        if (operation === 'update' && this.isEmptyField()) return <Redirect to={'/notfound'} />       
        
        return (
            <div className="divComment">
                <h1>Form {capitalize(operation)} Post</h1>

                Title:
                <input id="title" type="text" value={this.state.title} onChange={this.handleChange} />

                Body:
                <input id="body" type="text" value={this.state.body} onChange={this.handleChange} />

                Author:
                <input id="author" type="text" value={this.state.author} onChange={this.handleChange} />

                Category:
                <select id="category" value={this.state.category} onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="react" >react</option>
                    <option value="redux">redux</option>
                    <option value="udacity">udacity</option>
                </select>

                <br />

                {this.state.invalidField && (
                    <p><b>Required information. Please complete all fields!</b></p>
                )}

                <br />

                <div className="action-button">
                    <img src={iconSave} onClick={this.handleAdd} title="Save" alt="Save" />
                    <Link to={'/'}><img src={iconCancel} title="Cancel" alt="Cancel" /></Link>
                    <hr />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    const { postId } = ownProps.match.params
    return { post: posts && posts.find(post => post.id === postId) }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addPost, updatePost, searchPostById }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
