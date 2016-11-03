
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('./authenticate.js').passport;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server running on port: ' + port);

// Login
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/vote', (req, res) => {
    res.render('vote');
})

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/vote');
});

io.sockets.on('connection', function(socket) {

});