var express = require('express')
var router = express()

let catchError = (error) => {
    console.error(error)
}

router.get('/user_id', (req, res) => {
    console.log()
    return res.status(200).send((req.session.connected.id).toString())    
})

module.exports = router