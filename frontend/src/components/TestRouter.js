import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TestRouter extends Component {
    
    componentDidMount() {
        console.log("testRouter...")
        const { teste } = this.props.match.params;
        console.log(teste)
    }
    
    render() {
        const { teste } = this.props.match.params

        return (
            <div>
                <p>Component testRouter</p>
                <h2>List of Post xxxxxxxxxx: {teste}</h2>
                <Link to="/">Voltar</Link>


            </div>
        )
    }
}
