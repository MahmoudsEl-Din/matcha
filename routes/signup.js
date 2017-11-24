var express = require('express')
var router = express()
var User = require('../models/user.js')
var Check = require('../models/check.js')

let catchError = (error) => {
    console.error(error)
}

router.get('/', function(req, res) {
    let username = undefined
    if (!req.session.connected){
        req.session.connected = {'state': false, 'id': undefined}
    }
    if (req.session.connected.state !== false) {
        res.redirect('/')
    }
    else 
        res.render('pages/signup', {session :req.session, username: username})
})

router.post('/', function(req, res) {
    const {signup_username, signup_email, signup_firstname, signup_lastname, signup_password, signup_cpassword, signup_sexdate} = req.body;
    console.log(req.body)
    if (signup_username === '' || signup_email === '' || signup_firstname === '' || signup_lastname === '' || signup_password === '' || signup_cpassword === '' || signup_sexdate  === '')
        return res.send([false, "Empty field(s)"])
})

module.exports = router