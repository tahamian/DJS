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
	*@function getSongs
	*Return the next n song choices (the number n of song choices is set in server.js)
	*@param (String) - the pathname of where the music is
	*@return (Array) - a list of n songs that will be the new voting options
*/
function getSongs(p) {
	return fs.readdirSync(p)
}
/**
 * @exports server
 *  {getSongs} getsongs - function that gets the songs in an array
 */
exports.getSongs = getSongs
