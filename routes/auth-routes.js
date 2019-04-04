var router = require('express').Router();
var passport = require('passport');
const User = require('../models/user');


//auth login
router.get('/login', (req, res) => {
    res.render('login')
});
//post login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}), function(req, res) {});

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//register route 
router.get('/register', (req, res) => {
res.render('register');
});
// register post
router.post('/register', (req, res) => {
    // req.body.username
    // req.body.password
    // User.register(new User({username: req.body.username,firstname: req.body.firstname, lastname: req.body.lastname,mobileno:req.body.mobileno}), req.body.password, (err, user) => {
    //     if(err) {
    //         console.log(err);
    //         return res.render('register');
    //     } else {
    //         passport.authenticate('local')(req, res, function() {
    //             res.redirect('/home');
    //         })
    //     }
    // })
    var newUser = new User(
        {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobileno: req.body.mobileno,

       });
    if(req.body.isSeller === 'seller'){
        newUser.isSeller = true ;
        //res.redirect("/homeseller");
    }
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            
            req.flash("error", err.message);
            return res.render("register");
        }  else {
                    passport.authenticate('local')(req, res, function() {
                        res.redirect('/home');
                    })
                }
    });
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
res.redirect('/home');
// res.send("you reached on callback");

});
module.exports = router; 