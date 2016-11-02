/**
 * @module player
 * @version 1.0
*/

var player = require('play-sound')(opts = {})

/**
 * Plays a song
 * @param {string} song - Complete path of the song file
 * @param {function} done - callback function to be called when song is done playing
 * @author Victor Velechovsky
 * @version 0.1
*/
function play(song, done) {
	songPath = __dirname + '/music/' + song
	console.log('Playing song: ' + song)
	player.play(songPath, {timeout: '10000'}, function(err) {
		//done()
	})
}

exports.play = play
