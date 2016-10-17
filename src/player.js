const exec = require('child_process').exec

/*
	Stop any currently playing music, and play filename instead

	@param song - the song to be played immediately
	@param done - callback function for when the song is done
*/
function play(song, done) {
	exec('omxplayer ' + song, (err, stdout, stderr) => {
		if (err) {
			console.log('player.js: err\n' + err)
			return
		}
		if (stderr) {
			console.log('player.js: stderr\n' + err)
			return
		}

		done()
	})
}

exports.play = play
