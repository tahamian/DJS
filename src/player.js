const execSync = require('child_process').execSync

/*
	Stop any currently playing music, and play filename instead

	@param song - the song to be played immediately
	@param done - callback function for when the song is done
*/
function play(song, done) {
	var songPath = __dirname + '/music/' + song
	var cmd = 'omxplayer \"' + songPath + '\"'
	console.log('About to execute cmd:' + cmd)
	execSync(cmd)
	console.log('song over')
}

exports.play = play
