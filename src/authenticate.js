var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Obviously this needs to be stored and configured somewhere else!
var PASSWORD = "root";

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === 'root' && password === 'root')
            return done(null, {name: 'root' });

        return done(null, false);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

exports.passport = passport;
