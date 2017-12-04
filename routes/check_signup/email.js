var express = require('express')
var router = express()
var User = require('../../models/user.js')
var Check = require('../../models/check.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/', (req, res) => {
    Check.EmailExists(req.body.signup_email)
    .then((exists) => {
        if (exists)
            return null
        else
            return Check.IsGoodEmail(req.body.signup_email)
    }).then((reg) => {
        if (reg === null)
            return res.send(true)
        else
            return res.send(false)    
    }).catch(catchError)
})

module.exports = router