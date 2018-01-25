var express = require('express')
var router = express()
var Check = require('../models/check.js')
var User = require('../models/user.js')

let catchError = (error) => {
    console.error(error)
}

router.post('/', function(req, res) {
    const { form_password, form_username } = req.body;
    
    if (!req.session.connected){
        req.session.connected = {'state': false, 'id': undefined}
    }
    if (form_username === '' || form_password === '')
        return res.send([false, "Empty field(s)"])
    else {
        Check.connection(form_username, form_password)
            .then((ret) => {
                if (ret[0] === true){
                    User.GetIdByUsername(form_username)
                    .then((id) => {
                        req.session.connected.state = true
                        req.session.connected.id = id
                        ret[1] = id
                        return res.send(ret)
                    }).catch(catchError)
                }
                else 
                    return res.send(ret)
            }).catch(catchError)
    }
})

module.exports = router