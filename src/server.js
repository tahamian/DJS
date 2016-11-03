var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    handlebars = require('express-handlebars'),
    bodyParser = require('body-parser').urlencoded({ extended: true }),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    authenticate = require('./authenticate.js').authenticate;

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === 'root' && password === 'root')
            return done(null, {name: 'root' });

        return done(null, false);
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use('/public', express.static(__dirname + '/public'));
app.use(cookieParser);
app.use(bodyParser);
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 3000;
server.listen(port);
console.log('Server running on port: ' + port);

// Login
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/songs');
});

io.sockets.on('connection', function(socket) {

});