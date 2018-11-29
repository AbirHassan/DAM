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
const Asset = mongoose.model('Asset');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
/*
app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log("=====");
  console.log("req.query: ", req.query);
  console.log("req.body: ", req.body);
  next();
});
*/
app.get('/', function(req, res) {
    req.session.hello = "helloworld"
    if(!req.session.user) {
        res.redirect('/login');
    } else {
        if (req.query.edit != undefined) {
            Canvas.findOne({user:res.locals.user._id, name: req.query.edit}, (err, curr) => {
                res.render('index', {canvas: curr.content});
            });
        } else {
            res.render('index', {canvas:false});
        }
    }
});

app.get('/editCanvas', function(req, res) {
    if(!req.session.user) {
        res.redirect('/login');
    } else {
        Canvas.find({user:res.locals.user._id}, (err, canvases) => {
			if(err) {
				console.log(err);
			} else {
                res.render('canvas-edit', {canvases});
			}
        });
    }
});

app.post('/addCanvas', (req, res) => {
    if(!req.session.user.username) {
        res.redirect('/login');
    } else {
        console.log("saving canvas");
        const newCanvas = new Canvas({
		    name: req.body.name,
            user: req.session.user._id,
            content: req.body.content
		});
		
	    newCanvas.save( (err, newCanvas) => {
            if(err) {
                console.log("Failed");
                res.render('canvas-add', {message: "Failed"});
            } else {
                res.redirect('/');
            }
        });
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