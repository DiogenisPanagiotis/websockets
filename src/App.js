import React, { Component } from 'react'
import Layout from './components/Layout'
import './index.css'
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
	    	<div>
	    		<Route path="/" component={Layout} />
	    	</div>
    	</BrowserRouter>
    )
  }
}

export default App
