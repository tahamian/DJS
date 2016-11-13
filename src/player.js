/**
 * @module player
 * @version 1.0
*/

/**
 *@type {Object} 
 */
var player = require('play-sound')(opts = {})

/**
 * This function Plays a song
 * @param {string} song - Complete path of the song file
 * @param {function} done - callback function to be called when song is done playing
*/
function play(song, done) {
	songPath = __dirname + '/music/' + song
	console.log('Playing song: ' + song)
	player.play(songPath, function(err) {
		//done()
	})
}
/**
 * @exports server
 * @type {play} - export the function play
 */
exports.play = play
