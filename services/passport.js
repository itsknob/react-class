const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');   // collection

passport.serializeUser((user, done) => {
    // user is record from DB that we just made
    // can't guarentee user has googleId, may have signed up with another service
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then( user => { 
            done(null, user) 
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // console.log("profile", profile);
        // Grab profile data from authorized user.
        User.findOne({googleId: profile.id})
            .then( (existingUser) => {
                if(existingUser) {
                    // done(error, user);
                    done(null, existingUser);
                }
                else{
                    new User({ googleId: profile.id })      // create user
                        .save()                             // persist in db
                        .then(user => done(null, user));    // done
                }
            });
    })
);