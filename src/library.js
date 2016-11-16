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

	// For each album art
	for (let i = 0; i < data.length; i++) {

		var rawData = data [i].picture
		var savePath = __dirname + '/public/' + data [i].fileName + '.png'

		fs.writeFile(savePath, rawData, 'base64', (err) => {
			if (err) console.log('IconHelper: fs.WriteFile() error\n' + err)
		})

	}
}

/**
 * @function clearAlbumArt
 * Clear all the album art that is currently located in the public folder
 */
function clearAlbumArt(albumPaths, done) {

	for(var i = 0; i < albumPaths.length; i++) {
		fs.unlinkSync(albumPaths [i])
	}

	done()

}

/**
 * @exports server
 *  {getSongs} getsongs - function that gets the songs in an array
 */
exports.getSongs = getSongs
exports.saveAlbumArt = saveAlbumArt
exports.clearAlbumArt = clearAlbumArt
