
var http = require('http')
var express = require('express')
// const fileUpload = require('express-fileupload')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')
var connection = require('./setup/connection')
var request = require('ajax-request')
var path = require('path')
const pug = require('pug')
var cookieParser = require('cookie-parser');
var cookie = require('cookie')

// Template Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Middlewares
app.use('/assets', express.static('public'))
app.use('/stylesheets', express.static('public/stylesheets'))
app.use('/fonts', express.static('public/fonts'))
app.use('/javascript', express.static('public/javascript'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(fileUpload())
app.use(session({
    secret: 'clefchiffrement',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Database install
const db = require('./setup/connection')
new db()

// Require middlewares
var middlewares = require('./middlewares/middlewares')



// Require routes
var index = require('./routes/index.js')
var login = require('./routes/login.js')
var reset_password = require('./routes/reset_password.js')
var change_password = require('./routes/change_password.js')
var logout = require('./routes/logout.js')
var signup = require('./routes/signup.js')
var signup_email = require('./routes/check_signup/email.js')
var signup_username = require('./routes/check_signup/username.js')
var signup_password = require('./routes/check_signup/password.js')
var signup_cpassword = require('./routes/check_signup/cpassword.js')
var code_verif = require('./routes/code_verif.js')
var error = require('./routes/error.js')
const profil = require('./routes/profil')
const search = require('./routes/search')
var user = require('./routes/user')
var notif = require('./routes/notif')
var tools = require('./routes/tools')


app.use('/', middlewares.user_timer, index)
app.use('/login', login)
app.use('/logout', middlewares.logged_needed, logout)
app.use('/signup', signup)
app.use('/check_signup_email', signup_email)
app.use('/check_signup_username', signup_username)
app.use('/check_signup_password', signup_password)
app.use('/check_signup_cpassword', signup_cpassword)
app.use('/code_verif', code_verif)
app.use('/reset_password', reset_password)
app.use('/change_password', change_password)
app.use('/error', error)
app.use('/profil', middlewares.logged_needed, profil)
app.use('/search', middlewares.logged_needed, middlewares.gender_needed, search)
app.use('/user', middlewares.logged_needed, user)
app.use('/notif', middlewares.logged_needed, notif)
app.use('/tools', middlewares.logged_needed, tools)

app.use(function(req, res) {
    res.redirect('/error')
});

//Port :+: Localhost
var serv = app.listen(7777)

// SOCKETS //

var User = require('./models/user')
var httpServer = http.createServer(app, (req, res) => {
    res.writeHead(200)
})

var io = require('socket.io').listen(serv);

io.on('connection', function (socket) {
    var cookies = cookieParser.signedCookies(cookie.parse(socket.handshake.headers.cookie), 'clefchiffrement');
    var session_id = cookies['connect.sid'];

    console.log(socket.client.id + '   Session id -> ' + session_id + ' Referer -> ' + socket.request.headers.referer)
    User.SetSocketID(socket.client.id, session_id)

    socket.on("user_login", data => {
        // console.log(sessionid)
        User.SetSessionID(session_id, data.uid)
    })

    socket.on("visit", data => {
        User.NewVisit(data)
        User.GetSocketID(data.uid_target)
        .then((socket_id) => {
            var socketList = io.sockets.server.eio.clients;
            if (socketList[socket_id] !== undefined)            
            {
                io.sockets.in(socket_id).emit('new_notif',{
                    type: 1,
                    uid_visitor: data.uid
                })
            }
        }).catch((err) => {throw err})
    })
    
    socket.on("like", data => {
        User.GetSocketID(data.uid_target)
        .then((socket_id) => {
            var socketList = io.sockets.server.eio.clients;
            if (socketList[socket_id] !== undefined)            
            {
                io.sockets.in(socket_id).emit('new_notif',{
                    type: 2,
                    uid: data.uid_target,
                    uid_visitor: data.uid,
                    like_type: data.type
                })
            }
        }).catch((err) => {throw err})
    })

    socket.on("like", data => {
    })
})