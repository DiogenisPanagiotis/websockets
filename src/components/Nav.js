import React, { Component } from 'react'

export default class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
              <h2><a className="navbar-brand" href="#">Chat App</a></h2>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                </ul>
                <form className="form-inline mt-2 mt-md-0">
                  <button className="btn btn-danger" type="submit">?</button>
                </form>
              </div>
            </nav>
        );
    }
}

   
