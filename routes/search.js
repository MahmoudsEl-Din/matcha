let express = require('express')
let router = express()
var User = require('../models/user.js')
let geolib = require('geolib')



let catchError = error => {
    console.log(error)
}

router.get('/', (req, res) => {
    let username = undefined    
    User.GetAllById(req.session.connected.id)
    .then((user_info) => {
        username = user_info['username'].toUpperCase()      
        res.render('pages/search', {session : req.session, username: username })
    }).catch(catchError)
})

router.get('/search_them_all/:ageRange/:popRange/:geoRange/:tag',
    (req, res) => {
        console.log("prout")
        if (req.session.connected.state !== false) {
            console.log("lol")
            User.GetAllById(req.session.connected.id)
            .then(user_info => {
                let gender = user_info['genre']
                let desire = user_info['desire']
                let uLng = user_info['lng']
                let uLat = user_info['lat']
                let range = req.params.geoRange
                User
                .getAroundMe(uLat, uLng, range)
                .then(target => {
                    res.send(req.params)
                })
                .catch(console.log)
            })
            .catch(console.log)
        }
        else
            res.send(req.params);
})

module.exports = router