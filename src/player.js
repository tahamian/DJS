var player = require('play-sound')(opts = {})

function play(song, done) {
	songPath = __dirname + '/music/' + song
	console.log('Playing:\n' + songPath)
	player.play(songPath, {timeout: 10000}, function(err) {
		done()
	})
}

exports.play = play
