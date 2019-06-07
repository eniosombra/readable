import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchCategories } from '../actions/categoriesAction'
import { capitalize } from '../helper/helper'

class Category extends Component {
    componentDidMount() {
        this.props.searchCategories()
    }

    render() {
        const { categories } = this.props

        return (
            <div>
                <p>Main menu</p>
                <p><Link to="/">Home</Link> || <Link to='/post/new'>New Post</Link> </p>
                <div>
                    <ol>
                        {categories.map(category => (
                            <ul key={category.path}>
                                <p>
                                    <Link to={`/${category.name}`}>{capitalize(category.name)}</Link>
                                </p>
                            </ul>
                        ))}
                    </ol>
                </div>
                <br />
                <button onClick={this.props.searchCategories}>Search</button>
            </div>
        )
    }
}

const mapStateToProps = categories => categories
const mapDispatchToProps = dispatch => bindActionCreators({ searchCategories }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Category)
