var http = require('http')
var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')
var connection = require('./setup/connection')
var request = require('ajax-request')
var path = require('path');


const pug = require('pug')

// Template motors
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Middlewares
app.use('/assets', express.static('public'))
app.use('/stylesheets', express.static('public/stylesheets'))
app.use('/fonts', express.static('public/fonts'))
app.use('/javascript', express.static('public/javascript'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'clefchiffrement',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Database install
const db = require('./setup/connection')
new db()

// Require routes
var login = require('./routes/login.js');

app.use('/login', login)

app.get('/', (req, res) => {
    res.render('pages/index')
})

app.listen(8080)