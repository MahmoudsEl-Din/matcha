var express = require('express')
var router = express()
var User = require('../models/user.js')
var Check = require('../models/check.js')
var AddDb = require('../models/add_db.js')

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
    let form = {signup_username, signup_email, signup_firstname, signup_lastname, signup_password, signup_cpassword, signup_sexdate}
    console.log(form)
    if (signup_username === '' || signup_email === '' || signup_firstname === '' || signup_lastname === '' || signup_password === '' || signup_cpassword === '' || signup_sexdate  === '')
        return res.send([false, "Empty field(s)"])
    else {
        Check.CreateAccount(form)
        .then((ret) => {
            if (ret[0] === false)
                return res.send(ret)
            else {
                console.log('test')
                AddDb.user(form)
                .then(() => {
                    return res.send([true, "Account succefully created, go check your mail to activate your account !"])
                })
            }
        }).catch(catchError)
    }
})

module.exports = router