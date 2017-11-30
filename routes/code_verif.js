var express = require('express')
var router = express()
var AddDb = require('../models/add_db')
var Check = require('../models/check')
var User = require('../models/add_db')

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
            username = user_info['username']
        }).catch(catchError)
    }
    Check.CodeExists(null, req.query.code, null)
    .then((results) => {
        console.log(results)
        if (results[false])
            return res.redirect('/error')
        else if (results[2] === 1)
            return [1, AddDb.ActivateUser(req.query.code)]
        else if (results[2] === 2)
            return [2, AddDb.ActivateUser(req.query.code)]
    }).then((ret) => {
        console.log(ret)
        if (ret && ret[0] === 1)
            res.render('pages/code', {session :req.session, username: username, code: 1})
        else if (ret && ret[0] === 2)
            res.render('pages/code', {session :req.session, username: username, code: 2})
        else
            res.redirect('/error')
    }).catch(catchError)
})

module.exports = router