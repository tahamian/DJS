/**
*@file Used to get the playlist of music
*<p> Assumptions
* <ul style="list-style: none;">
*  <li>The music files are audio files
*  <li>the music files are in the src
* </ul>
* @module library
* @version 1.0
*/

/**
 * File system library
 * @member {String} fs
 */
var fs = require('fs')
/**
 * Path library
 * @member {String} path
 */
var path = require('path')

/**
 * @member verbose {boolean} determines if verbose logging is enabled
*/
let verbose = false

/**
 * Set the verbose flag
 * @function setVerbose
 * @param value {boolean} verbose value
*/
function setVerbose(value) {
    if (value != true && value != false) return

    verbose = value
}

/**
 * Return the next n song choices (the number n of song choices is set in server.js)
 * @function getSongs
 * @param (String) the pathname of where the music is
 * @return (Array) a list of n songs that will be the new voting options
*/
function getSongs(p) {
	return fs.readdirSync(p)
}

/**
 * Save all the album art data in the public folder so that the client can
 * load and display them
 * @function saveAlbumArt
 * @param metadata {array} List of metadata items of the form:<br>
 * [<br>&emsp;{picture, fileName},<br>&emsp;{picture, fileName}<br>]
*/
function saveAlbumArt(data) {
	if (verbose) console.log(data.length);

	// For each album art
	for (let i = 0; i < data.length; i++) {

		var rawData = data [i].picture
		var savePath = __dirname + '/public/artwork/' + data [i].fileName + '.png'

        // Write album art data to file
		fs.writeFileSync(savePath, rawData, 'base64')
		if (verbose) console.log('Saving album art for: ' + data[i].fileName)

	}
}

/**
 * Clear all the album art that is currently located in the public folder
 * @function clearAlbumArt
 * @param albumPaths {String []} array of paths to clear
 * @param done {callback} callback function
*/
function clearAlbumArt(albumPaths, done) {
	// Maybe we should just clear ALL artwork?
	for(var i = 0; i < albumPaths.length; i++) {
		fs.unlinkSync(__dirname + albumPaths [i])
	}

	done()

}

exports.getSongs = getSongs
exports.saveAlbumArt = saveAlbumArt
exports.clearAlbumArt = clearAlbumArt
exports.setVerbose = setVerbose
