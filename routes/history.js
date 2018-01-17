var express = require('express')
var router = express()
var User = require('../models/user.js')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    User.GetAllById(req.session.connected.id)
    .then((user_info) => {
        username = user_info['username'].toUpperCase()
        res.render('pages/index', {session :req.session, username: username, user: user_info})
    }).catch(catchError)
}) 

module.exports = router