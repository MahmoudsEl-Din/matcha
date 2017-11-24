var express = require('express')
var router = express()

let catchError = (error) => {
    console.error(error)
}

router.post('/', function(req, res) {
    console.log('bien dans la fonction logout')
    console.log(req.session.connected)
    req.session.destroy();
    console.log(req.session.connected)
})

module.exports = router