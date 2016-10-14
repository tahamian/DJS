var express = require('express'),
		app = express(),
		server = require('http').createServer(app),
		io = require('socket.io').listen(server),
		handlebars = require('express-handlebars'),
		fs = require('fs')

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// List of Songs in /music 

var array = []
var fs = require("fs"),
    path = require("path");

var p = "../src/music"

fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }
    console.log("List of Files in /music");
    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
    	// add to array variable
    	array.push(path.basename(file));
    	console.log(array[0]);
    });
});







var vote = 0;
app.post('/vote', function(req,res){
  vote+=1;
  console.log('Vote Total= ' + vote);
  res.redirect(303, '/');
});

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
