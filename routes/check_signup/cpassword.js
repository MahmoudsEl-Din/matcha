var express = require('express')
var router = express()
var User = require('../../models/user.js')
var Check = require('../../models/check.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/', (req, res) => {
    Check.NewPasswordValid(req.body.password)
    .then((invalid) => {
        if (invalid || req.body.signup_password === '' || req.body.password !== req.body.cpassword)
            res.send(true)
        else
            res.send(false)
    }).catch(catchError)
})

module.exports = router