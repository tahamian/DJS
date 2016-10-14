var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		handlebars = require('express-handlebars'),
		fs = require('fs')

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

app.use('/public', express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket) {
	socket.on('connect-request', function(data) {
		if (!data) {
			var newID = generateNewID()
			socket.emit('connect-response', newID)
			fs.writeFile('users.db', users)
			console.log('New connection with ID: ' + newID)
		} else {
			console.log('User: ' + data + ' reconnected.')
		}
	})
	socket.on('disconnect', function(data) {
	})
})

function generateNewID() {
	return users++
}
