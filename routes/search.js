let express = require('express')
let router = express()
var User = require('../models/user.js')



let catchError = error => {
    console.log(error)
}

router.get('/', (req, res) => {
    let username = undefined
     
    if (!req.session.connected) {
        req.session.connected = {'state': false, 'id' : undefined}
    } if (req.session.connected.state !== false) {
        User.GetAllById(req.session.connected.id)
        .then((user_info) => {
            username = user_info['username'].toUpperCase()            
        }).catch(catchError)
    }
    res.render('pages/search', {session : req.session, username: username })
})

router.post('')

module.exports = router