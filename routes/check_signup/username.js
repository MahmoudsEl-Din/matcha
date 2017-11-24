var express = require('express')
var router = express()
var User = require('../../models/user.js')
var Check = require('../../models/check.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/', (req, res) => {
    Check.LoginExists(req.body.signup_username)
    .then((exists) => {
        if (exists || req.body.signup_username === '')
            res.send(true)
        else
            res.send(false)
    }).catch(catchError)
})

module.exports = router