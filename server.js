var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')
var connection = require('./setup/connection')
const pug = require('pug')

// Template motors
app.set('view engine', 'pug')


// Middlewares
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'clefchiffrement',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {

    res.render('pages/index')
})

app.listen(8080)