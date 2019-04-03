var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passportStrategy = require('passport-local');
const keys = require('./keys');
const User = require('../models/user');

//passport local Strategy
passport.use(new passportStrategy(User.authenticate()));
//serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
//deserialize user
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//Google strategy
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'https://anasenterprises.herokuapp.com/auth/google/redirect'
        //callbackURL: 'http://localhost:3000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db

        //console.log(profile);
        //console.log('accessToken: ', accessToken);
        //console.log('refreshToken:', refreshToken);
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);

