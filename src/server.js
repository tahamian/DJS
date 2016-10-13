var express = require('express');
var app = express();
var player = require('play-sound')(opts = {});

app.get('/', function (req, res) {
	res.send('Hello World!');
	player.play('Drake.mp3', function(err) {
		if (err) throw err
	})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
