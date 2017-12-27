import React, { Component } from 'react'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
import Nav from './Nav'
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
	}

	setUserNull = user => {
		if (this.state.user) {	
			if (this.state.user.id === user.id) {
				this.setState({user: null})
			}
		}
	}

	render() {
		const { socket, user } = this.state
		console.log(JSON.stringify(user, null, 2))
		return (
			<div className="Layout">
				<Nav user={user} />
				{
					!user ?
					<LoginForm socket={socket} login={this.login}/> 
					:
					<ChatContainer socket={socket} user={user} logout={this.logout} users={this.state.users} setUserNull={this.setUserNull}/>
				}
			</div>
		);
	}
}
