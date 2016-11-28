/**
*@file Used to get the playlist of music
*<p> Assumptions
* <ul style="list-style: none;">
*  <li>The music files are audio files
*  <li>the music files are in the src
* </ul>
* @module library
* @version 1.0
* @summary A concise summary.
*/

/**
 *Varaible sets the path using the require()
 * @member {String} fs
 */
var fs = require('fs')
/**
 * Variable gets the path using the require()
 * @member {String} path
 */
var path = require('path')

let verbose = false

function setVerbose(value) {
    if (value != true && value != false) return

    verbose = value
}

/**
 * @function getSongs
 * Return the next n song choices (the number n of song choices is set in server.js)
 * @param (String) - the pathname of where the music is
 * @return (Array) - a list of n songs that will be the new voting options
*/
function getSongs(p) {
	return fs.readdirSync(p)
}

/**
 * @function saveAlbumArt
 * Save all the album art data in the public folder so that the client can
 * load and display them
 * @param {[ metadata ]} List of metadata items as returned by metadata.js
 */
function saveAlbumArt(data) {

	if (verbose) console.log(data.length);

	// For each album art
	for (let i = 0; i < data.length; i++) {

		var rawData = data [i].picture
		var savePath = __dirname + '/public/artwork/' + data [i].fileName + '.png'

		fs.writeFileSync(savePath, rawData, 'base64')
		if (verbose) console.log('Saving album art for: ' + data[i].fileName)

	}
}

/**
 * @function clearAlbumArt
 * Clear all the album art that is currently located in the public folder
 */
function clearAlbumArt(albumPaths, done) {

	for(var i = 0; i < albumPaths.length; i++) {
		fs.unlinkSync(__dirname + albumPaths [i])
	}

	done()

}

exports.getSongs = getSongs
exports.saveAlbumArt = saveAlbumArt
exports.clearAlbumArt = clearAlbumArt
