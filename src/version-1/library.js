var fs = require('fs')
var path = require('path')

/*
	Return the next n song choices

	@param n - how many songs should be picked
	@return - a list of n songs that will be the new voting options
*/
function getSongs(p) {
	return fs.readdirSync(p)
}

exports.getSongs = getSongs
