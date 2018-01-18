var express = require('express')
var router = express()
var User = require('../models/user.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/get_notif', (req, res) => {
    User.GetNotif(req.session.connected.id)
    .then((ret) => {
        return res.send(ret);
    }).catch(catchError)
})

router.get('/get_user', (req, res) => {
    if (req.query.id) {
        User.GetAllById(req.query.id)
        .then((user) => {
            return res.send(user['username'])
        }).catch(catchError)
    }
    else
        res.send(undefined)
})

router.post('/notif_shown', (req, res) => {
    User.NotifShown(req.session.connected.id)
    .then(() => {
        return res.send()
    }).catch(catchError)
})

module.exports = router
    