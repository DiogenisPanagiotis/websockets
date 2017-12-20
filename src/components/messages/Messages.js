import React, { Component } from 'react';

export default class Messages extends Component {

	scrollDown = () => {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

	componentDidMount() {
		this.scrollDown()
	}

	componentDidUpdate(prevProps, prevState) {
		this.scrollDown()
	}
	
	render() {
		const { messages, user } = this.props
		console.log('Messages: ', messages)
		return (
				<div className="jumbotron jumbotron-chat-white chat-space" ref='container'>
					{
						messages.map(mes => {
							return (
								<div
									key={ mes.id }
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="time">{ mes.time }</div>
									<div className="data">
										<div className="message">{ mes.message }</div>
										<div className="name">{ mes.sender }</div>
									</div>
								</div>
							)
						})
					}
				</div>
		);
	}
}
