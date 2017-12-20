import React, { Component } from 'react';

export default class MessageInput extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}
	
	handleSubmit = e => {
		e.preventDefault()
		this.sendMessage()
		this.setState({message: ''})
	}

	sendMessage = () => this.props.sendMessage(this.state.message)

	render() {
		const { message } = this.state
		return (
			<div className="message-input">
				<form onSubmit={ this.handleSubmit }>		    
			    <div className="input-group">
			      <input 
			      	autoFocus
					id = "message"
					ref = {"messageinput"}
					type = "text"
					className = "form-control form-control-no-border"
					value = { message }
					autoComplete = {'off'}
			      	placeholder="Say something..." 
					onChange = { ({target}) => this.setState({message: target.value}) }
			      	/>
			      <span className="input-group-btn">
			        <button className="btn btn-secondary" type="submit">Send</button>
			      </span>
			    </div>
			    </form>
			</div>
		);
	}
}
