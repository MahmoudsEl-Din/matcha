var express = require('express')
var router = express.Router()
// let crypto = require('crypto')

router.post('/auth', function(req, res) {
    if (req.body.form_username === '' || req.body.form_password === '')
        return res.send(false)
    else
        return res.send(true)
})

module.exports = router