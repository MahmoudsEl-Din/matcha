var express = require('express')
var router = express()
var AddDb = require('../models/add_db')
var Check = require('../models/check')
var User = require('../models/user')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let is_redir = 0
    let username = undefined
    if (!req.session.connected){
        req.session.connected = {'state': false, 'id': undefined}
    }
    if (req.session.connected.state !== false) {
        User.GetAllById(req.session.connected.id)
        .then((user_info) => {
            username = user_info['username']
        }).catch(catchError)
        is_redir === 1 ? 0 :res.redirect('/')
        is_redir = 1
    }
    if (!req.query.code) {
        is_redir === 1 ? 0 :res.redirect('/error')
        is_redir = 1
    }        
    else {
        Check.CodeExists(null, req.query.code, null)
        .then((results) => {
            if (!results || results[0] === false) {
                is_redir === 1 ? 0 :res.redirect('/error')
                is_redir = 1
            }
            else if (results[2] === 1)
                return [1, AddDb.ActivateCode(req.query.code)]
            else if (results[2] === 2)
                return [2, true]
        }).then((ret) => {
            if (ret && ret[0] === 1)
                is_redir === 1 ? 0 :res.render('pages/code', {session :req.session, username: username, type: 1})
            else if (ret && ret[0] === 2)
                is_redir === 1 ? 0 :res.render('pages/code', {session :req.session, username: username, type: 2})
            else if (ret)
                is_redir === 1 ? 0 :res.redirect('/error')
        }).catch(catchError)
    }
})

module.exports = router