/**
*@file This is the file that sets up the server and is to be run in nodejs
*<p> Assumptions:
*  <li>When the server is started the first song from the library will be playing this song will be chosen at random
*  <li>All votes are set to 0 when the server is started
*  <li> Every user has only one unique ID when voting
* </ul>
 * @module server
 * @version 1.0
 * @summary A concise summary.
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
	args = require('./args.js'),
	md = require('./metadata.js')

app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/**
 * @member {commandLineArgs}optins - variable that takes in the command line arugment
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
 * @member {String} music - This is a varaible that gets the pathname
 */
var music = library.getSongs(musicPath)
/**
 *
 * @member {Array} votes - an array for the number of votes per song
 *This is also a state variable because the highest number of votes in the array is the next song
 */
var votes = []
/**
 * @member {number} users - this variable reads the file users.db and retrves the user list
*This is also a state varaible the users can chose a song but can change their decsion until the song is finished
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

/**
*@method app,use()
* Allows users to load resources in the '/public' folder
*@param {String} '/public' - the location of home.js
*@param (express) - this for the express library for static files like home.js
*@param {String} '/public' - the location of home.js
*/
app.use('/public', express.static(path.join(__dirname, 'public')))

/**
*@type {String} currentSong - This variable picks the song to be played, this is also an Envoirnmental Variable because it changes the song that is currently being played
*@type {number} musicIndex - the music index is set to 1
*@type {Array} choices - this is selects how many choices of music that the user will be able to vote for and what music
*/
var currentSong, musicIndex, choices, metadata, albumPaths
currentSong = music[0]
musicIndex = 1
choices = music.slice(musicIndex, musicIndex + 5)
albumPaths = []
updateMetaData(() => { })

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

		var sendData = {
			'choices': choices,
			'albumPaths': albumPaths
		}

		socket.emit('update-songs', sendData)

		var voteData = []

		for (var i = 0; i < votes.length; i++) {
			voteData.push(votes[i].song)
		}
		
		socket.emit('update-votes', voteData)

	})

	/**
	*@function soocket()
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
		/**
		*@member {Array} voterData - holds the amount of votes per song
		*/
		var voteData = []

		for (var i = 0; i < votes.length; i++) {
			voteData.push(votes[i].song)
		}

		io.sockets.emit('update-votes', voteData)
	})

	/**
	*@function soocket.on()
	*@param {String} 'disconnect' - String parameter for the socket library that disconnects the server so it can be updated
	*@param {function} data - Contains the userID and the name of the song
	**/
	socket.on('disconnect', function (data) {
	})

})
/**
*@function done()
 * when a song is finished the function is called
 * calls function to call the tallyvote method and resets the votes
 */
function done() {
	console.log('done function')
	currentSong = tallyVotes()
	votes = []
}

/**
*@function tallyVotes()
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
	updateMetaData(() => {
		var sendData = {
			vhoices: choices,
			metadata: metadata
		}

		io.sockets.emit('update-songs', sendData)

		return maxSong
	})
}
/**
 * This is a function that generates a unique user ID for every new user
 *@returns {number} users - Returns the user plus one
 */
function generateNewID() {
	return users++
}

function updateMetaData(done) {

	library.clearAlbumArt(albumPaths, () => {
		md.getMetaData(choices, (data) => {
			metadata = data
			library.saveAlbumArt(data)

			albumPaths = []
			for (var i = 0; i < choices.length; i++) {
				albumPaths.push('/public/artwork/' + choices[i] + '.png')
			}

			done()
		})
	})

}
