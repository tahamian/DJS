/**
 * @module library
 * @version 1.0
 */
/**
 *Varaible sets the path
 * @type {String} fs
 */
var fs = require('fs')
/**
 * Variable gets the path
 * @type {String} path
 */
var path = require('path')

/**
	*Return the next n song choices
	*@param (String) - how many songs should be picked
	*@return (Array) - a list of n songs that will be the new voting options
*/
function getSongs(p) {
	return fs.readdirSync(p)
}
/**
 * @exports server
 * @type {getSongs} getsongs - function that gets the songs in an array
 */
exports.getSongs = getSongs
