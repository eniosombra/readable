import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../App.css'
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
                <p />
                <h4>Filter Posts by Categories:</h4>
                <ul>
                    {categories.map(category => (
                        <li key={category.path}>
                            <b><Link to={`/${category.name}`}>{capitalize(category.name)}</Link></b>
                        </li>
                    ))}
                </ul>
                <hr />
            </div>
        )
    }
}

const mapStateToProps = categories => categories
const mapDispatchToProps = dispatch => bindActionCreators({ searchCategories }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Category)
