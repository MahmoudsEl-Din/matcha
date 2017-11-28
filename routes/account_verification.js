var express = require('express')
var router = express()
var AddDb = require('../models/add_db')
var User = require('../models/add_db')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    AddDb.ActivateUser(req.query.code)
    .then(() => {
        res.redirect('/')
    })
})

module.exports = router