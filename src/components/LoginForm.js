import React, { Component } from 'react';
import { VERIFY_USER } from '../Events.js'

export default class LoginForm extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			nickname: '',
			error: ''
		}
	}

	verifyUser = ({isUser, user}) => {
		if (isUser) {
			this.setError('Username taken')
		} else {
			this.setError('')
			this.props.login(user)
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.verifyUser)
	}

	handleChange = (e) => {
		if (this.state.error !== '') {
			this.setState({ error: ''})
		}
		this.setState({ nickname: e.target.value })
	}

	setError = (error) => this.setState({error})

	renderClassName = () => {
		const { error } = this.state
		return `${error ? 'is-invalid' : ''} form-control form-control-no-border`
	}

	render() {	
		const { nickname, error } = this.state
		return (
			<div className="container container-login">
				<div className="jumbotron jumbotron-login-grey">
					<div className="row">
						<div className="col">
							<h2 className="loginHeader">Got a nickname?</h2>
							<br/>
							<form onSubmit={this.handleSubmit} className="login-form">
								<div className="input-group">
								  	<span className="input-group-addon" id="basic-addon1">@</span>
								  	<input 
								  		autoFocus
								  		type="text" 
								  		className={this.renderClassName()} 
								  		placeholder="Username" 
										value={nickname}
										onChange={this.handleChange}
								  		maxLength="21"
								  		/>
								</div>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col">
					  		{ error ? <div className="invalid">{error}</div> : null }
						</div>
					</div>
				</div>
			</div>
		);
	}
}