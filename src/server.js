var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		handlebars = require('express-handlebars'),
		fs = require('fs'),
		path = require('path'),
		colors = require('colors'),
		player = require('./player.js'),
		library = require('./library.js'),
		voter = require('./voter.js')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

var musicPath = __dirname + '/music'
var music = library.getSongs(musicPath)

var votes = []

var users
fs.readFile('users.db', (err, data) => {
	users = parseInt(data)
})

var port = process.env.PORT || 3000
server.listen(port)
console.log('Server running on port: ' + port)

app.get('/', (req, res) => {
	res.render('home')
})

// Allows users to load resources in the '/public' folder
app.use('/public', express.static(__dirname + '/public'))

var currentSong, musicIndex, choices

currentSong = music[0]
musicIndex = 1
choices = music.slice(musicIndex, musicIndex + 5)
player.play(currentSong, done)

io.sockets.on('connection', function(socket) {
	socket.on('connect-request', function(data) {

		// If the user does not have an ID cookie set, create one
		if (!data) {
			var newID = generateNewID()
			socket.emit('connect-response', newID)
			fs.writeFile('users.db', users)
			console.log('New connection with ID: ' + newID)
		// Otherwise just use the existing ID
		} else {
			console.log('User: ' + data + ' reconnected.')
		}

		socket.emit('update-songs', choices)
	})

	/*
		A user has voted for a song. We have to first make sure that this user
		hasn't voted yet!!

		@param data - Contains the userID and the name of the song
	*/
	socket.on('vote', function(data) {
		console.log('Vote incoming from: ' + data.id)
		var id = data.id
				song = data.song
		var idFound = false
		for (var i = votes.length - 1; i >= 0; i--) {
			if(id == votes[i].id){
				votes[i].song = song
				idFound = true
			}
		}

		if(idFound == false){

			votes.push({
			'id': id,
			'song': song

			})
		}
		console.log(JSON.stringify(votes))
	})

	socket.on('disconnect', function(data) {
	})

})

function done() {
	console.log('done function')
	currentSong = voter.tallyVotes(choices, votes)
	player.play(maxSong, done)
	musicIndex += 5
	choices = music.slice(musicIndex, musicIndex + 5)
	io.sockets.emit('update-songs', choices)
}

function generateNewID() {
	return users++
}
