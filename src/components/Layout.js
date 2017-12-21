import React, { Component } from 'react'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
import { USER_CONNECTED, USER_DISCONNECTED } from '../Events.js'

const socketUrl = 'http://localhost:8080'

export default class Layout extends Component {
	
	constructor(props) {
	  	super(props)
	  	this.state = {
	  		socket: null,
	  		user: null
	  	}
	}

	componentWillMount() {
		this.initSocket()
	}

	initSocket = () => {
		const socket = io(socketUrl)
		this.setState({socket})
	}

	login = user => {
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user)
		this.setState({user})
	}

	logout = user => {
		const { socket } = this.state
		socket.emit(USER_DISCONNECTED, user)
		this.setState({user: null})		
	}
	
	render() {
		const { socket, user } = this.state
		return (
			<div className='Layout'>
			{
				!user ?
				<LoginForm socket={socket} login={this.login} /> 
				:
				<ChatContainer socket={socket} user={user} logout={this.logout} />
			}
			</div>
		);
	}
}
