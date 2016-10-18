var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		handlebars = require('express-handlebars'),
		fs = require('fs'),
		path = require('path'),
		player = require('./player.js'),
		library = require('./library.js')

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// List of Songs in /music
var array = []
var p = "../src/music"

var votes = [];
fs.readdir(p, function (err, files) {

	if (err) {
      throw err
  }

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

var vote = 0

app.post('/vote', function(req,res){
  vote+=1
  console.log('Vote Total= ' + vote)

  res.redirect(303, '/')
})

var users

fs.readFile('users.db', (err, data) => {
	users = parseInt(data)
})

var port = process.env.PORT || 3000
server.listen(port)
console.log('Server running on port: ' + port)

app.get('/', (req, res) => {
	res.render('home')
})

// Allows users to load resources in the '/public' folder
app.use('/public', express.static(__dirname + '/public'))

var currentSong = array[0]

function done() {
	// 1. Reset voting system
	// 2. Update website
	// 3. Set currentSong
	player.play(currentSong, this)
}

player.play(currentSong, done())

io.sockets.on('connection', function(socket) {

	socket.on('connect-request', function(data) {
		// If the user does not have an ID cookie set, create one
		if (!data) {
			var newID = generateNewID()
			socket.emit('connect-response', newID)
			fs.writeFile('users.db', users)
			console.log('New connection with ID: ' + newID)
		// Otherwise just use the existing ID
		} else {
			console.log('User: ' + data + ' reconnected.')
		}

		// Obviously needs to be replaced with real data
		songlist = library.getSongs(5)
		socket.emit('update-songs', songlist)
	})

	/*
		A user has voted for a song. We have to first make sure that this user
		hasn't voted yet!!

		@param data - Contains the userID and the name of the song
	*/
	socket.on('vote', function(data) {
		console.log('Vote incoming from: ' + data.id)
		var id = data.id
				song = data.song
		var idFound = false;
		for (var i = votes.length - 1; i >= 0; i--) {
			if(id == votes[i].id){
				votes[i].song = song
				idFound = true;
			}
		};

		if(idFound == false){

			votes.push({
			'id': id,
			'song': song

			})
		}
		console.log('Votes Array' + JSON.stringify(votes))
	})

	socket.on('disconnect', function(data) {
	})

})

function generateNewID() {
	return users++
}

/*
	Called by the player when the song is done playing. Determines what the next
	song should be, tells the player what new song to play, and prepare the new
	vote
*/
function songDone() {

}
