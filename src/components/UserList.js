import React, { Component } from 'react';

export default class UserList extends Component {

	renderUserList = () => {
		const { users } = this.props
		return (
			<div className="list-group">
			{
				users ?
				(users.map(user => {
					return (
					  <li className="list-group-item d-flex justify-content-between align-items-center"key={user.id}>
						{user.name}
					    <span className="badge badge-danger badge-pill">{user.id.slice(0, 10)}</span>
					  </li>
					)
				}))
				: 
				null
			}
			</div>
		)
	}
	
	render() {
		return (
			<div className="jumbotron jumbotron-user-list">{this.renderUserList()}</div>
		)
	}
}
