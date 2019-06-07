import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import uuid from 'uuid'

import { addPost, searchPostById } from '../actions/postsAction'
import { capitalize } from '../helper/helper'

class PostForm extends Component {

    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
    }

    state = {
        title: '',
        body: '',
        author: '',
        category: 'react',
        invalidField: false,
        redirectToHome: false,
        operation: 'new'
    }

    componentDidMount() {
        const { postId } = this.props.match.params
        this.setOperation(postId)

        const { post } = this.props
        this.populateFields(post)
        //this.getData(postId)
    }

    componentWillReceiveProps(nextProps) {
        const { postId } = this.props.match.params
        const nextPostId = nextProps.match.params.postId
        if (postId !== nextPostId) {
            this.setOperation(nextPostId)
        }
        //console.log('toda vez que clico:' +postId)
    }



    setOperation(postId) {
        if (postId !== undefined) {
            this.setState({ operation: 'update' })

            console.log('update')
        } else {
            console.log('new')
            this.setState({ operation: 'new' })
            this.clearFields()
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        console.log(event.target.value)
    }

    populateFields = (post) => {
        console.log(post)
        this.setState({
            title: post ? post.title : '',
            body: post ? post.body : '',
            author: post ? post.author : '',
            category: post ? post.category : ''
        })

        //console.log(post.category)
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

    handleAdd() {
        if (this.isEmptyField()) {
            console.log('Is there any empty fields')
            this.setState({ invalidField: true, redirectToHome: false })
        } else {
            let newRecord = {}
            const { addPost } = this.props

            newRecord = {
                id: uuid().split('-').join(''),
                title: this.state.title,
                body: this.state.body,
                author: this.state.author,
                category: this.state.category,
                timestamp: Date.now()
            }

            addPost(newRecord)
            console.log('Data added successfully!')
            this.clearFields()
            this.setState({ invalidField: false, redirectToHome: true })
        }
    }

    render() {
        if (this.state.redirectToHome) return <Redirect to={'/'} />

        //console.log(this.state.category)
        const x = this.state.category
        console.log(x)

        const xhtml = 'teste1111111111111111'

        const xdefault = 'defaultValue='+'"'+x+'"'
        //const template = `<div>${user.name} - <span>${user.email}</span></div>`;

        const temp =    `<div>
                            <p>${x}</p>
                        </div>`

        return (
            <div>
                <p>{xhtml}</p>
                <p>{xdefault}</p>

                <p>{temp}</p>

                <p>{`
                    if (${x} =='react') {
                        <p>enio</p>
                    }
                        ${x}
                    `}
                </p>

                
                
                <h1>Form {capitalize(this.state.operation)} Post</h1>
                Title:
                <input id="title" type="text" value={this.state.title} onChange={this.handleChange} />
                Body:
                <input id="body" type="text" value={this.state.body} onChange={this.handleChange} />
                Author:
                <input id="author" type="text" value={this.state.author} onChange={this.handleChange} />
                <p>category: {this.state.category}</p>
                {xdefault}
                Category:
                {this.state.category === 'react' && (
                    <select id="category" defaultValue={`${x}`} onChange={this.handleChange}>
                        <option value="react">react</option>
                        <option value="redux">redux</option>
                        <option value="udacity">udacity</option>
                    </select>
                )}

                


                <br />

                {this.state.invalidField && (
                    <p><b>Required information. Please complete all fields!</b></p>
                )}

                <br />
                <button onClick={this.handleAdd}>Add Post</button>

                <button onClick={this.getPost}>GET Post</button>

                <Link to={'/'}><button>Cancel</button></Link>
            </div>
        )
    }
}

const mapStateToProps = ({ posts }, ownProps) => {
    const { postId } = ownProps.match.params
    return {
        post: posts && posts.find(post => post.id === postId)
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({ addPost, searchPostById }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
