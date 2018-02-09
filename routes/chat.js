var express = require('express')
var router = express()
var AddDb = require('../models/add_db')
var Check = require('../models/check')
var User = require('../models/user')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let username = undefined
    let user_i = undefined

    User.GetAllById(req.session.connected.id)
    .then((user_info) => {
        username = user_info['username'].toUpperCase()
        user_i = user_info
    }).then(() =>{
        res.render('pages/chat', {session :req.session, username: username, user: user_i})
    }).catch(catchError)
})

router.get('/get_match_info', (req, res) => {
    User.GetMatchInfo(req.session.connected.id)
    .then(matchs_info => {
        res.send(matchs_info)
    }).catch(catchError)
})

router.get('/get_messages', (req, res) => {
    User.GetMessages(req.session.connected.id, req.query.id)
    .then(messages => {
        res.send(messages)
    }).catch(catchError)
})

module.exports = router