var express = require('express')
var router = express()
var User = require('../models/user.js')
var moment = require('moment')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let username = undefined
    let user_info = undefined
    if (req.query && req.query.uid) {
        console.log(req.query.uid)        
        User.IsBlocked(req.session.connected.id, req.query.uid)
        .then((blocked) => {
            console.log(blocked)
            if (blocked === true)
                return res.redirect('/error')
            else
                return User.GetAllById(req.session.connected.id)
        })
        .then((user_ret) => {
            user_info = user_ret            
            if (user_ret) 
                return User.IdExists(req.query.uid)
        })
        .then((id_exists) => {
            if (id_exists)
                return User.GetAllById(req.query.uid)
        })
        .then((profile_info) => {
            if (profile_info) {
                console.log(user_info)
                username = user_info['username'].toUpperCase()
                res.render('pages/user', {session :req.session, username: username, user: profile_info})
            }
            else
                res.redirect('/error')
            }).catch(catchError)
    }
    else
        res.redirect('/error')
})

router.get('/get_user_info', (req, res) => {
    User.GetAllById(req.query.uid)
    .then((infos) => {
        res.send(infos)
    })
})

router.get('/get_user_status', (req, res) => {
    User.GetTime(req.query.uid)
    .then((time) => {
        momt = moment(time[0]['time']).fromNow()    
        res.send([time[0], momt])
    })
})

router.get('/get_user_tags', (req, res) => {
    console.log(req.query)
    User.GetTags(req.query.uid)
    .then((user_tags) => {
        res.send(user_tags)            
    }).catch(catchError)
})

router.get('/get_pictures', (req, res) => {
    User.GetAllPictures(req.query.uid)
    .then((ret) => {
        ret.forEach((elem) => {
            elem['filepath'] = '/assets/pictures/' + elem['picture_name']
        })
        return res.send(ret)
    }).catch(catchError)
})

router.get('/report_block', (req, res) => {
    User.ReportBlock(req.session.connected.id, req.query.uid, req.query.type)
    .then((ret) => {
        res.send(ret)
    }).catch(catchError)
})

module.exports = router