/**
 * @file metadata.js
 * Provides metadata information from music files
 * @module metadata
*/
var fs = require('fs'),
	mm = require('musicmetadata')

/**
 * Returns an array of metadata elements that each contain:
 * title, artist, album, albumart
 * @function getMetaData
 * @param list {String} - array of music file paths
 * @param done(metadata) { function } callback that contains the result
 * @return {Object} Returns metadata in the callback with the following form:<br>
 * [<br>
 *   &emsp;  { title, album, artist, picture, format } <br>
 * ] <br><br>
 * format: File extension of the albumart <br>
 * picture: Raw bin64 picture data <br>
 */
function getMetaData(list, done) {
	var data = []

	save(list, data, 0, list.length, done)
}

// Recursive save function to deal with async behaviour
function save(list, data, start, end, done) {

	if (start < end) {
		var readableStream = fs.createReadStream(__dirname + '/music/' + list[start])
		var parser = mm(readableStream, (err, metadata) => {
			if (err) throw err

			data.push({
				title: (metadata.tile != undefined) ? metadata.title : 'title',
				album: (metadata.album != undefined) ? metadata.album: 'album',
				artist: (metadata.artist != undefined) ? metadata.artist : 'artist',
				// Add the artwork. If the file doesn't have artwork, use the default
				picture: (metadata.picture.length > 0) ? metadata.picture [0].data : defaultPicture(),
				// File format of the artwork
				format: (metadata.picture.length > 0) ? metadata.picture [0].format: defaultFormat(),
				fileName: list[start]
			})

			readableStream.close()

			save(list, data, start + 1, end, done)
		})
	} else done(data)

}

// Default picture for songs that don't have artwork
function defaultPicture() {
	return fs.readFileSync(__dirname + '/public/artwork/default.png', 'base64')
}

// Default picture format for songs that don't have artwork
function defaultFormat() {
	return '.png'
}

exports.getMetaData = getMetaData
