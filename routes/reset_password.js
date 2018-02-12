var express = require('express')
var router = express()
var Check = require('../models/check')
var Tools = require('../models/tools')
var User = require('../models/user')


let catchError = (error) => {
    console.error(error)
}

router.post('/', function(req, res) {
    if (!req.body.form_reset)
        return res.send([false, "Error"])
    Check.EmailExists(req.body.form_reset)
    .then((exists) => {
        if (exists) {
            User.GetIdByEmail(req.body.form_reset)
            .then((id) => {
                return User.ResetEmail(id, req.protocol + '://' + req.get('host') + "/code_verif?code=")        
            }).then((status) => {
                if (status)
                    return res.send([true, "Reset mail has been sent"])
                return res.send([false, "Error"])
            }).catch(catchError)
        }
        else
            return res.send([false, "Email doesn't exist"])
    }).catch(catchError)
})

module.exports = router