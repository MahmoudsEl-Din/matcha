let express = require('express')
let router = express()
var User = require('../models/user.js')
let geolib = require('geolib')



let catchError = error => {
    console.log(error)
}

router.get('/search', (req, res) => {
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

router.get('/search_them_alls/:ageRange/:popRange/:geoRange/:tag',
    (req, res) => {
    if (req.session.connected && req.session.connected.id)
    {
        User
        .GetAllById(req.connected.id)
        .then(user_info => {
            gender = user_info['gender']
            desire = user_info['desire']
            // maxLat = 
        })
        .catch(console.log)
    }
    res.send('wewewe');
})

module.exports = router