import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    renderNavCollapse = () => {
        const { user } = this.props
        return user ? 
        (
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/users"><span className="nav-link" href="/users">{user ? "Users" : null} <span className="sr-only">(current)</span></span></Link>
                </li>
                <li className="nav-item">
                    <Link to="/"><span className="nav-link" href="/">{user ? "Chat" : null}</span></Link>
                </li>
            </ul>
        )
        :
        <ul className="navbar-nav mr-auto"></ul>
    }

    render() {
        const avatarSrc = "https://avatars3.githubusercontent.com/u/14981916?s=400&u=85620452a086a9dbaaad4a071ecfe0f85c985a86&v=4"
        return (
            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
                <a className="navbar-brand" target="_blank" href="https://github.com/DiogenisPanagiotis"><img className="avatar" src={avatarSrc}/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                {this.renderNavCollapse()}
                </div>
            </nav>
        );
    }
}

   
