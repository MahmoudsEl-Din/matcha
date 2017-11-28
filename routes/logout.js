var express = require('express')
var router = express()

let catchError = (error) => {
    console.error(error)
}

router.post('/', function(req, res) {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router