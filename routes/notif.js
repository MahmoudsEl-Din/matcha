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
    let block = undefined
    if (req.query.id) {
        User.IsBlocked(req.session.connected.id, req.query.id)
        .then(blocked => {
            block = blocked
            return User.GetAllById(req.query.id)
        }).then((user) => {
            if (block === false)
                return res.send(user['username'])
            else
               return res.send(block)
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
    