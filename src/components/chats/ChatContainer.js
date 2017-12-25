import React, { Component } from 'react'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED } from '../../Events'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import UserList from '../UserList'

export default class ChatContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			communityChat: null
		}
	}

	componentDidMount() {
		const { socket } = this.props
		socket.emit(COMMUNITY_CHAT, this.makeCommunityChat)
	}

	makeCommunityChat = chat => {
		const { socket, user } = this.props
		this.setState({communityChat: chat})
		socket.on(MESSAGE_RECIEVED, this.addMessageToChat)		
		socket.on("RECEIVED", this.addUserToUsers)	
		this.sendUser(user)
	}

	addUserToUsers = user => {
		const { communityChat } = this.state
		let updatedChat = communityChat
		updatedChat.users.push(user)
		this.setState({communityChat: updatedChat})
	}

	addMessageToChat = message => {
		const { communityChat } = this.state
		let updatedChat = communityChat
		updatedChat.messages.push(message)
		this.setState({communityChat: updatedChat})
	}

	sendMessage = message => {
		const { socket } = this.props
		socket.emit(MESSAGE_SENT, message)
	}

	sendUser = user => {
		const { socket } = this.props
		socket.emit("SENT", user)
	}

	renderChatContainer = () => {
		const { communityChat } = this.state
		const { user, logout } = this.props
		if (communityChat !== null) {
			if (window.location.pathname === "/users") {
				return (
					<UserList users={communityChat.users}/>
				)
			} else {
				return (
					<div className="jumbotron jumbotron-chat">	
						<Messages 
							messages={communityChat.messages}
							user={user}
							/>
						<MessageInput 
							sendMessage={message => this.sendMessage(message)}
							/>
						<br/>
						<button onClick={() => {logout(user)}} type="button" className="btn btn-danger btn-lg btn-block">Logout</button>
					</div>
				)
			}
		}
	}



	render() {
		const { communityChat } = this.state
		console.log(`Community Chat Users: ${JSON.stringify(communityChat, null, 2)}`)
		return (
			<div className="container container-chat">
				{this.renderChatContainer()}
			</div>
		);
	}
}

