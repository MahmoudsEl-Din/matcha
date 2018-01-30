var express = require('express')
var router = express()
var AddDb = require('../models/add_db')
var Check = require('../models/check')
var User = require('../models/user')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let username = undefined
    if (!req.session.connected){
        req.session.connected = {'state': false, 'id': undefined}
    }
    if (req.session.connected.state !== false) {
        User.GetAllById(req.session.connected.id)
        .then((user_info) => {
            username = user_info['username']
        }).catch(catchError)
        res.redirect('/')
    }
    if (!req.query.code)
        res.redirect('/error')
    else {
        Check.CodeExists(null, req.query.code, null)
        .then((results) => {
            if (results[false])
                res.redirect('/error')
            else if (results[2] === 1)
                return [1, AddDb.ActivateCode(req.query.code)]
            else if (results[2] === 2)
                return [2, true]
        }).then((ret) => {
            if (ret && ret[0] === 1)
                res.render('pages/code', {session :req.session, username: username, type: 1})
            else if (ret && ret[0] === 2)
                res.render('pages/code', {session :req.session, username: username, type: 2})
            else if (ret)
                res.redirect('/error')
        }).catch(catchError)
    }
})

module.exports = router