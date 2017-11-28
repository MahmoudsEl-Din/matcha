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
app.set('views', path.join(__dirname, 'views'));
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
var index = require('./routes/index.js')
var login = require('./routes/login.js')
var logout = require('./routes/logout.js')
var signup = require('./routes/signup.js')
var signup_email = require('./routes/check_signup/email.js')
var signup_username = require('./routes/check_signup/username.js')
var signup_password = require('./routes/check_signup/password.js')
var signup_cpassword = require('./routes/check_signup/cpassword.js')
var account_verification = require('./routes/account_verification.js')

app.use('/', index)
app.use('/login', login)
app.use('/logout', logout)
app.use('/signup', signup)
app.use('/check_signup_email', signup_email)
app.use('/check_signup_username', signup_username)
app.use('/check_signup_password', signup_password)
app.use('/check_signup_cpassword', signup_cpassword)
app.use('/account_verification', account_verification)


app.listen(7777)