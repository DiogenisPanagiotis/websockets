import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { user } = this.props
        return (
            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
                <h2><a className="navbar-brand" href="/">Chat App</a></h2>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/users"><a className="nav-link" href="/users">{user ? "Users" : null} <span className="sr-only">(current)</span></a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/"><a className="nav-link" href="/">{user ? "Chat" : null}</a></Link>
                        </li>
                    </ul>
                    <a target="_foo" href="https://github.com/DiogenisPanagiotis"><button className="btn btn-danger" type="submit">Github</button></a>
                </div>
            </nav>
        );
    }
}

   
