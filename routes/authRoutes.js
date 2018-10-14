const passport = require('passport');

module.exports = (app) => {
    // Initial request
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    // Second request with code
    app.get('/auth/google/callback', passport.authenticate('google'));

    // logs out current user
    app.get('/api/v1/logout', (req, res) => {
        req.logout();
        res.send(req.user); // proof - shows nothing
    });

    // get's info about current user
    app.get('/api/v1/current_user', (req, res) => {
        res.send(req.user);
    });
}