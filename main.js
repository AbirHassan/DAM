const express = require('express');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const bodyParser = require('body-parser');
const session = require('express-session');
require( './db' );
const auth = require('./auth.js');

// use function to create application object
// (web application, allows you to serve web pages)
const app = express();
const mongoose = require('mongoose');

const Canvas = mongoose.model('Canvas');
//const MenuItem = mongoose.model('MenuItem');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	secret: 'keyboard cat',
	cookie: {},
	resave: false,
	saveUninitialized: true
}));

app.use((req, res, next)=> {
    res.locals.user = req.session.user;
    next();
});

app.get('/', function(req, res) {
    if(!req.session.user.username) {
        res.redirect('/login');
    } else {
        res.render('index');
    }
});

app.get('/canvas/add', (req, res) => {
    if(!req.session.user.username) {
        res.redirect('/login');
    } else {
        res.render('canvas-add');
    }
});

app.post('/canvas/add', (req, res) => {
    if(!req.session.user.username) {
        res.redirect('/login');
    } else {
        

        res.redirect('/');
    }
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    auth.register(req.body.username, req.body.email, req.body.password, (err) => {
        res.render('register', {message: err.message});
    },
    (user) => {
        auth.startAuthenticatedSession(req, user, () => {
            res.redirect('/');
        });
    });
});
        

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    auth.login(req.body.username, req.body.password, (err) => {
        res.render('login', {message: err.message});
    },
    (user) => {
        auth.startAuthenticatedSession(req, user, () => {
            res.redirect('/');
        });
    });
});

app.get('/logout', (req, res) => {
	auth.endAuthenticatedSession(req);
	res.redirect('/');
});


app.listen(3000, function() {
  console.log("listening on port ", 3000);
});