var express = require('express')
var router = express()
var User = require('../models/user.js')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let username = undefined
    console.log(req.session)
    if (!req.session.connected){
        req.session.connected = {'state': false, 'id': undefined}
    }
    if (req.session.connected.state !== false) {
        User.GetAllById(req.session.connected.id)
        .then((user_info) => {
            username = user_info['username'].toUpperCase()
            res.render('pages/index', {session :req.session, username: username})
        }).catch(catchError)
    }
    else 
        res.render('pages/index', {session :req.session, username: username})      
})

router.get('/search_them_all/:ageRange/:popRange/:geoRange/:tag',
(req, res) => {
    console.log("prout")
    if (req.session.connected.state !== false) {
        console.log("lol")
        new Promise((resolve, reject) => {
            User
            .theBigSearch(req.params, req.session.connected.id)
            .then(target => {
                console.log(target)
                res.render('pages/index', {session :req.session, target: target})
            })
            .catch(console.log)
        })     
    } else
        res.send(req.params);
})

module.exports = router