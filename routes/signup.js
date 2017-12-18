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
    if (signup_username === '' || signup_email === '' || signup_firstname === '' || signup_lastname === '' || signup_password === '' || signup_cpassword === '')
        return res.send([false, "Empty field(s)"])
    else if (signup_username.length > 15 || signup_email.length > 200 || signup_firstname.length > 15 || signup_lastname.length > 15 || signup_password.length > 200 || signup_cpassword.length > 200)
        return res.send([false, "Don't try to break me ..."])
    else {
        Check.CreateAccount(form)
        .then((ret) => {
            if (ret[0] === false)
                return res.send(ret)
            else {
                console.log('test')
                AddDb.user(form, req)
                .then(() => {
                    return res.send([true, "Account succefully created, go check your mail to activate your account !"])
                }).catch(catchError)
            }
        }).catch(catchError)
    }
})

module.exports = router