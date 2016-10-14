var player = require('play-sound')(opts = {})

/*
	Stop any currently playing music, and play filename instead

	@param song - the song to be played immediately
	@param done - callback function for when the song is done
*/
function play(song, done) {
	done()
}

exports.play = play
