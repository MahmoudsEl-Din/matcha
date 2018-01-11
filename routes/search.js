let express = require('express')
let router = express()
var User = require('../models/user.js')
let geolib = require('geolib')



let catchError = error => {
    console.log(error)
}

router.get('/', (req, res) => {
    let username = undefined    
    User.GetAllById(req.session.connected.id)
    .then((user_info) => {
        username = user_info['username'].toUpperCase()      
        res.render('pages/search', {session : req.session, username: username })
    }).catch(catchError)
})

// router.get('/search_them_all/:ageRange/:popRange/:geoRange/:tag', 
//     (req, res) => {
//         if (req.session.connected.state !== false) {
//             new Promise((res, rej) => {
//                 User.theBigSearch(req.params, req.session.connected.id)
//                 .then(target => {
//                     res.send(target)
//                 })
//                 .catch(console.log)
//             })
//         } else
//             res.send(req.params)
// })

router.get('/search_them_all/:ageRange/:popRange/:geoRange/:tag',
    (req, res) => {
        console.log("prout")
        if (req.session.connected.state !== false) {
            console.log("lol")
            new Promise((resolve, reject) => {
                User
                .theBigSearch(req.params, req.session.connected.id)
                .then(target => {
                    res.send(target)
                })
                .catch(console.log)
            })     
        } else
            res.send(req.params);
})

module.exports = router