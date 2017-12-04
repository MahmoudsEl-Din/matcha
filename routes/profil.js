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
            console.log(user_info)
            username = user_info['username'].toUpperCase()
           
            if (user_info['genre'] === 'B')
                user_info['genre'] = 'No gender yet'
            else
                user_info['genre'] === 'M' ? user_info['genre'] = 'I\'m a dick' : user_info['genre'] = 'I\'m a pussy'
            
            if (user_info['desire'] === 'B')
                user_info['desire'] = 'I like all'
            else
                user_info['desire'] === 'M' ? user_info['desire'] = 'I like dicks' : user_info['genre'] = 'I like pussies'
            res.render('pages/profil', {session :req.session, username: username, user: user_info})
        }).catch(catchError)
    }
    else 
        res.redirect('/error')
    
})

    //              __
    //              ||
    // It works     ||
    //              ||
    //              ||
    //             \  /
    //              \/

// router.get('/mabite', (req, res) => {
//     let username = undefined
//     console.log(req.session)
//     if (!req.session.connected){
//         req.session.connected = {'state': false, 'id': undefined}
//     }
//     if (req.session.connected.state !== false) {
//         User.GetAllById(req.session.connected.id)
//         .then((user_info) => {
//             username = user_info['username'].toUpperCase()
//             res.render('pages/index', {session :req.session, username: username})
//         }).catch(catchError)
//     }
//     else 
//         res.render('pages/error', {session :req.session, username: username})
// })

module.exports = router