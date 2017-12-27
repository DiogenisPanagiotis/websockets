const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
	    COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = {}

let communityChat = createChat()

module.exports = function(socket) {
					
	console.log(`Socket Id: ${socket.id}`)

	let sender

	//user connects
	socket.on(USER_CONNECTED, user => {
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user 
		sender = user.name
		console.log(`${user.name} connected`)
		console.log(JSON.stringify(connectedUsers, null, 2))
	})

	//user disconnects
	socket.on(USER_DISCONNECTED, user => {
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		console.log(`${user.name} disconnected`)
		console.log(JSON.stringify(connectedUsers, null, 2))
		io.emit("REMOVEUSER", user)
	})

	//verify username
	socket.on(VERIFY_USER, (nickname, verifyUser) => {
		if (isUser(connectedUsers, nickname)) {
			verifyUser({isUser: true, user: null })
		} else {
			verifyUser({isUser: false, user: createUser({name: nickname})})
		}
	})

	//make community chat
	socket.on(COMMUNITY_CHAT, makeCommunityChat => {
		makeCommunityChat(communityChat)
	})

	//message sent
	socket.on(MESSAGE_SENT, message => {
		io.emit(MESSAGE_RECIEVED, createMessage({message, sender}))
	})

	//user sent
	socket.on("SENT", user => {
		io.emit("RECEIVED", user)
	})

}

function addUser(userList, user) {
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

function removeUser(userList, username) {
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

function isUser(userList, username) {
  	return username in userList
}

