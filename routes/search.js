let express = require('express')
let router = express()
var User = require('../models/user')
// let geolib = require('geolib')
const Search = require('../models/search')


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

// function checkTag(e, req) {
//     var i = 0
//     while (req.params.tag[i]){
//         if (e.tag_name.search(req.params.tag[i]) !== -1)
//             return false
//         i += 1
//     }
//     return true
// }

router.get('/search_them_all/:ageRange/:popRange/:geoRange/:tag/:page/:order', (req, res) => {
        console.log("search them all")
        console.log(req.params.tag)
        if (req.session.connected.state !== false) {
            new Promise((resolve, reject) => {
                req.params.tag = JSON.parse(req.params.tag)
                req.params.order = JSON.parse(req.params.order)                
                Search.theBigSearch(req.params, req.session.connected.id)
                .then(target => {
                    if (req.params.tag[0])
                        res.send(target.filter((e) => {
                            var i = 0
                            while (req.params.tag[i]){
                                if (e.tag_name.search(req.params.tag[i]) == -1)
                                    return false
                                i += 1
                            }
                            return true
                        }))
                    else
                       res.send(target)

                }).catch(console.log)
            })     
        } else
            res.send(req.params);
})

module.exports = router