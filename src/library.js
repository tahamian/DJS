/*
	Return the next n song choices

	@param n - how many songs should be picked
	@return - a list of n songs that will be the new voting options
*/
function getSongs(n) {
	return ['a', 'b', 'c', 'd', 'jj']
}

/*
	Once a song has been voted on, server.js should notify this module which song
	has been picked so that it will not be chosen again (we don't want songs to
	be repeated!)

	@param song - song that has been voted on
*/
function updateCurrentSong(song) {

}

exports.getSongs = getSongs
exports.updateCurrentSong = updateCurrentSong
