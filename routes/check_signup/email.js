var express = require('express')
var router = express()
var User = require('../../models/user.js')
var Check = require('../../models/check.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/', (req, res) => {
    console.log(req.body)
    Check.EmailExists(req.body.signup_email)
    .then((exists) => {
        if (exists)
            res.send(true)
        else
            res.send(false)
    }).catch(catchError)
})

module.exports = router