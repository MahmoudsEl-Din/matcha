var express = require('express')
var router = express.Router()
var crypto = require('crypto')
var check = require('../models/check.js')

router.post('/', function(req, res) {
    console.log(req.body.form_username)
    console.log(req.body.form_password)    
    if (req.body.form_username === '' || req.body.form_password === '')
        return res.send(false)
    else {
        check.connection(req.body.form_username, req.body.form_password)
            .then((ret) => {
                console.log(ret)
                return res.send(ret) 
            }).catch((err) => {
                console.error(err)
            })  
    }
        
})

module.exports = router