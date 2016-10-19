var player = require('play-sound')(opts = {})

function play(song, done) {
	songPath = __dirname + '/music/' + song
	console.log('Playing song: ' + song)
	player.play(songPath, {timeout: 20000}, function(err) {
		done()
	})
}

exports.play = play
