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
        callbackURL: '/auth/google/callback',    // relative path translates to http not https
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // Grab profile data from authorized user.
        const existingUser = await User.findOne({googleId: profile.id})

        if(existingUser) {
            return done(null, existingUser);
        }

        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
    })
);