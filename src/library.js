var fs = require('fs')
var path = require('path')

/*
	Return the next n song choices

	@param n - how many songs should be picked
	@return - a list of n songs that will be the new voting options
*/
function getSongs(p) {
	array = []

	fs.readdirSync(p, function (err, files) {
		if (err) { console.log(err) }

	  files.map(function (file) {
	      return path.join(p, file)
	  }).filter(function (file) {
	      return fs.statSync(file).isFile()
	  }).forEach(function (file) {
	  	// add to array variable
	  	array.push(path.basename(file))
	  	console.log(array[0])
	  })

	})

	return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
}

exports.getSongs = getSongs
