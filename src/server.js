var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		handlebars = require('express-handlebars'),
		fs = require('fs'),
		path = require('path'),
		colors = require('colors'),
		player = require('./player.js'),
		library = require('./library.js')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

var musicPath = __dirname + '/music'
var music = library.getSongs(musicPath)
console.log('music: ' + JSON.stringify(music))

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

var ioSocket = []

io.sockets.on('connection', function(socket) {
	ioSocket = socket

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

		currentSong = music[0]
		musicIndex = 1
		choices = music.slice(musicIndex, musicIndex + 6)
		player.play(currentSong, done)
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
		console.log('Votes Array' + JSON.stringify(votes))
	})

	socket.on('disconnect', function(data) {
	})

})

function done() {
	musicIndex += 5
	choices = music.slice(musicIndex, musicIndex + 6)
	socket.emit('update-songs', choices)
	currentSong = tallyVotes()
	player.play(currentSong, this)
}

function tallyVotes() {
	var tallies = []
	for (var i = 0; i < choices.length; i++) {
		tallies.push({
			'song': choices[i],
			'votes': 0
		})
	}

	for (var i = 0; i < votes.length; i++) {
		var song = votes[i].song

		for (var j = 0; j < tallies.length; j++) {
			if (tallies[i].song == song) tallies[i].votes++
		}
	}

	var maxTally = -1
	var maxSong
	for (var i = 0; i < tallies.length; i++) {
		if (tallies[i].votes > maxTally) {
			maxSong = tallies[i].song
			maxTally = tallies[i].votes
		}
	}

	return maxSong
}

function generateNewID() {
	return users++
}
