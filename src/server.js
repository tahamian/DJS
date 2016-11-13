/**
 * @module server
 * @version 1.0
 */

/**
 * Library Imports
 * @type {*}
 */
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	handlebars = require('express-handlebars'),
	fs = require('fs'),
	path = require('path'),
	commandLineArgs = require('command-line-args'),
	player = require('./player.js'),
	library = require('./library.js'),
	args = require('./args.js')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/**
 * @type {}
 */
var options = commandLineArgs(args.options)

/**
 * @type {String} musicPath - This is a varaible that sets the pathname
 * 
 * Set the music directory as either the default, or the -m flag, if applicable
 */
var musicPath = __dirname + '/music'
if (options.musicDir) musicPath = options.musicDir
/**
 * @type {String} musicPath - This is a varaible that sets the pathname
 */
var music = library.getSongs(musicPath)
/**
 *
 * @type {Array} votes - an array for the number of votes per song
 */
var votes = []
/**
 * @type {number} users - this variable reads the file users.db and retrves the user list
 */
var users
fs.readFile('users.db', (err, data) => {
	users = parseInt(data)
})


 
//This sets the location of the webserver (right now set to port 3000)
var port = process.env.PORT || 3000
server.listen(port)
console.log('Server running on port: ' + port)

/**
 * @function get
 * Default routing function - returns the home page
 * 
 * @param {String} - Endpoint (/)
 * @param req - HTML Request object
 * @param res - HTML Response object
 */
app.get('/', (req, res) => {
	res.render('home')
})

// Allows users to load resources in the '/public' folder
app.use('/public', express.static(__dirname + '/public'))


// Initialize the first set of song choices and the first song
var currentSong, musicIndex, choices
currentSong = music[0]
musicIndex = 1
choices = music.slice(musicIndex, musicIndex + 5)

// Start playing the first song
player.play(currentSong, done)

io.sockets.on('connection', function (socket) {
	socket.on('connect-request', function (data) {

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

	/**
	*A user has voted for a song. We have to first make sure that this user
	*hasn't voted yet!!
	*@param {Array} - Contains the array of votes per song
	*@param {function} - Contains the userID and the name of the song
	**/
	socket.on('vote', function (data) {
		console.log('Vote incoming from: ' + data.id)
		var id = data.id
		var song = data.song
		var idFound = false

		for (var i = votes.length - 1; i >= 0; i--) {
			if (id == votes[i].id) {
				votes[i].song = song
				idFound = true
			}
		}

		if (idFound == false) {
			votes.push({
				'id': id,
				'song': song
			})
		}
		console.log(JSON.stringify(votes))

		var voteData = []

		for (var i = 0; i < votes.length; i++) {
			voteData.push(votes[i].song)
		}

		socket.emit('update-votes', voteData)
	})
	/**
	*@type {boolean}
	 *@param {String} - String parameter for the socket library
	*@param {function} - Contains the userID and the name of the song
	**/
	socket.on('disconnect', function (data) {
	})

})
/**
 * when a song is finished the function is called
 * calls function to call the tallyvote method and resets the votes
 */
function done() {
	console.log('done function')
	currentSong = tallyVotes()
	votes = []
}

/**
 *This function gets all the votes for every song and selects the song with the highest votes then resets the vote count to zero.
 * Then it gets the title of the song with the most votes and returns that value
 * @returns {String} maxsong - Retruns the title of the song
 */
function tallyVotes() {

	// Array to keep track of running totals
	var tallies = []
	//Initialize it to 0's'
	for (var i = 0; i < choices.length; i++) {
		tallies.push({
			'song': choices[i],
			'votes': 0
		})
	}

	// For each vote
	for (var i = 0; i < votes.length; i++) {
		var song = votes[i].song
		// Scan the tallies array until the right song is found
		// and increment the total
		for (var j = 0; j < tallies.length; j++) {
			if (tallies[j].song == song) {
				tallies[j].votes++
			}
		}
	}

	// Scan the tallies array and pick the maximum value
	var maxTally = -1
	var maxSong
	for (var i = 0; i < tallies.length; i++) {
		if (tallies[i].votes > maxTally) {
			maxSong = tallies[i].song
			maxTally = tallies[i].votes
		}
	}

	// Play the highest-voted song
	player.play(maxSong, done)

	// Pick the next 5 choices to vote on
	musicIndex += 5
	choices = music.slice(musicIndex, musicIndex + 5)
	io.sockets.emit('update-songs', choices)

	return maxSong
}
/**
 * This is a function that generates a unique user ID for every new user
 *@returns {Number} users - Returns the user plus one
 */
function generateNewID() {
	return users++
}
