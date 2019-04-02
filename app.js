var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authRoutes = require('./routes/auth-routes');
var profileRoutes = require('./routes/profile-routes');
var keys = require('./config/keys');
var passportSetup = require('./config/passport-setup');
var cookieSession = require('cookie-session');

var app = express();

//set  view engine for ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));

//set cookie-session
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.set('debug', true);
mongoose.connect(keys.mongodb.dbURL, () => {
    console.log('Database base has been connected');
});
mongoose.Promise = global.Promise;

const port = process.env.PORT || 3000;

app.use('/auth', authRoutes);
app.use('/home', profileRoutes);




app.get('/', (req, res) => {
    res.render('landing-page.ejs')
});

app.listen(port, () => {
    console.log('Server has been started!!!');
});
