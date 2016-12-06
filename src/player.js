/**
 * @file player.js
 * Music player
 *<p> Assumptions
 * <ul style="list-style: none;">
 *  <li>There has to be a media player installed on the server
 * </ul>
 * @module player
 * @version 1.0
 * @summary A concise summary.
 *
*/

/**
 *@member {Object} play-sound library
 */
var player = require('play-sound')(opts = {})

/**
 * This function Plays a song
 * @function play
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
 *
 */
exports.play = play
