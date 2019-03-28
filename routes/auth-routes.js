var router = require('express').Router();
var passport = require('passport');


//auth login
router.get('/login', (req, res) => {
    res.render('login')
});

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
             'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/userinfo.email'],
    accessType: 'offline',
    prompt: 'consent',
    successRedirect: '/mailbox',
    failureRedirect: '/login'
}));

//callback route for google to redirect to
//handle control to passport to use code to grap profile info
//middleware
router.get('/google/redirect', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
// res. send(req.user);
res.redirect('/profile');
// res.send("you reached on callback");

});
module.exports = router; 