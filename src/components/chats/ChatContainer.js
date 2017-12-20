import React, { Component } from 'react'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED } from '../../Events'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'

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
		const { socket } = this.props
		this.setState({communityChat: chat})
		socket.on(MESSAGE_RECIEVED, this.addMessageToChat)		
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

	renderChatContainer = () => {
		const { communityChat } = this.state
		const { user, logout } = this.props
		if (communityChat !== null) {
			return (
				<div className="jumbotron jumbotron-chat-grey">	
					<Messages 
						messages={communityChat.messages}
						user={user}
						/>
					<MessageInput 
						sendMessage={message => this.sendMessage(message)}
						/>
					<br/>
					<button onClick={() => {logout(user)}} type="button" className="btn btn-primary btn-lg btn-block">Logout</button>
				</div>
			)
		}
	}

	render() {
		console.log(`Community Chat: ${this.state.communityChat}`)
		return (
			<div className="container container-chat">
				{this.renderChatContainer()}
			</div>
		);
	}
}

