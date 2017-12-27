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

	renderMessage = mes => {
		if (mes.message.includes('youtube.com/embed/')) {
			let embededId = mes.message.split('embed/')[1]
			return (
				<div className="data">
					<iframe className="embed" width="200" height="112" src={`https://www.youtube.com/embed/${embededId}?autoplay=1&player=html5&rel=0&wmode=transparent`} frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
					<div className="message">{ mes.message }</div>
					<div className="name">{ mes.sender }</div>
				</div>
			)		
		}

		if (mes.message.includes('http') || mes.message.includes('www.')) {
			return (
				<div className="data">
					<a href={mes.message} target="_foo">{ mes.message }</a>
					<div className="name">{ mes.sender }</div>
				</div>
			)
		} 
			
		return (
			<div className="data">
				<div className="message">{ mes.message }</div>
				<div className="name">{ mes.sender }</div>
			</div>
		)
	}
	
	render() {
		const { messages, user } = this.props
		return (
				<div className="jumbotron jumbotron-chat-white chat-space" ref='container'>
					{
						messages ?
						(messages.map(mes => {
							return (
								<div key={ mes.id } className={`message-container ${mes.sender === user.name && 'right'}`}>
									<div className="time">{ mes.time }</div>
									{this.renderMessage(mes)}
								</div>
							)
						}))
						:
						null
					}
				</div>
		);
	}
}
