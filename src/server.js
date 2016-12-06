/**
 * @file This is the file that sets up the server and is to be run in nodejs
 * <p> Assumptions:
 *  <li>When the server is started the first song from the library will be playing this song will be chosen at random
 *  <li>All votes are set to 0 when the server is started
 *  <li> Every user has only one unique ID when voting
 * </ul>
 * @module server
 * @version 1.0
 * @summary A concise summary.
*/

// Library imports
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
	md = require('./metadata.js'),
	errorHandler = require('./error-handler.js')

// Set the tempalting engine to be handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

/**
 * @member options {args.options} variable that dictates command line arguments
 */
var options = commandLineArgs(args.options)

/**
 * @member verbose {boolean} determines if verbose logging is enabled
*/
var verbose = false
if (options.verbose === null) verbose = true

if (verbose) {
	library.setVerbose(true)
	console.log('Logging in verbose mode')
}

// Set the music path - defaults to './music' but can be changed with the
// -d flag
/**
 * @member musicPath {String} path of the music folder
*/
var musicPath = __dirname + '/music'
if (options.musicDir) musicPath = options.musicDir

/**
 * @member music {String []} array of song paths
*/
var music = library.getSongs(musicPath)

// Stores all the votes during the current round of voting
var votes = []

/**
 * @member users {int} how many unique users have connected to this server
*/
var users
fs.readFile('users.db', (err, data) => {
	users = parseInt(data)
})

/**
 * @member port {int} port that the server runs on
*/
var port = process.env.PORT || 3000

/**
 * Handles error handling
 * @function on
 * @param event {String} error
 * @param callback {callback} callback function
*/
server.on('error', errorHandler.errorCallback)

// Start server
server.listen(port)
if (verbose) console.log('Server running on port: ' + port)

/**
 * Default routing function - returns the home page
 * @function get
 * @param {String} - Endpoint (/)
 * @param req - HTML Request object
 * @param res - HTML Response object
 */
app.get('/', (req, res) => {
	res.render('home')
})

/**
* Serves a folder with public resources that clients can request
* @function use
* @param {String} '/public' - the location of home.js
* @param (express) - this for the express library for static files like home.js
*/
app.use('/public', express.static(path.join(__dirname, 'public')))

/**
* @member {String} currentSong - This variable picks the song to be played, this is also an Envoirnmental Variable because it changes the song that is currently being played
* @member {number} musicIndex - the music index is set to 1
* @member {Array} choices - this is selects how many choices of music that the user will be able to vote for and what music
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
			if (verbose) console.log('New connection with ID: ' + newID)
			// Otherwise just use the existing ID
		} else {
			if (verbose) console.log('User: ' + data + ' reconnected.')
		}

		// Data to sned to the client about the song choices
		var sendData = {
			'choices': choices,
			'albumPaths': albumPaths
		}

		socket.emit('update-songs', sendData)

		getVoteData((voteData) => {
			io.sockets.emit('update-votes', voteData)
		})

	})

	/**
	* A user has voted for a song.
	* @function on
	* @param {Array} - Contains the array of votes per song
	* @param {function} - Contains the userID and the name of the song
	**/
	socket.on('vote', function (data) {
		if (verbose) console.log('Vote incoming from: ' + data.id)
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
		if (verbose) console.log(JSON.stringify(votes))

		/**
		*@member {Array} voterData - holds the amount of votes per song
		*/
		getVoteData((voteData) => {
			io.sockets.emit('update-votes', voteData)
		})
	})

})
/**
 * when a song is finished the function is called
 * calls function to call the tallyvote method and resets the votes
 * @function done
*/
function done() {
	if (verbose) console.log('done function')
	currentSong = tallyVotes()
	votes = []
}

/**
*This function gets all the votes for every song and selects the song with the highest votes then resets the vote count to zero.
* Then it gets the title of the song with the most votes and returns that value
* @function tallyVotes
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
			choices: choices,
			albumPaths: albumPaths
		}

		io.sockets.emit('update-songs', sendData)

		return maxSong
	})
}
/**
 * This is a function that generates a unique user ID for every new user
 * @function generateNewID
 * @returns {number} users - Returns the user plus one
 */
function generateNewID() {
	return users++
}

/**
 * Updates the metadata for the new song choices
 * @function updateMetaData
 * @param done {callback} Callback function
 */
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

/**
 * Compile the vote data to be sent to the web clients
 * @function getVoteData
 * @return {array} Vote data of the form:
 * [
 *   {
 * 	   id: ID, song: SONG
 *   }
 * ]
 */
function getVoteData(done) {
	var voteData = []

	for (var i = 0; i < votes.length; i++) {
		voteData.push(votes[i].song)
	}

	done(voteData)
}
