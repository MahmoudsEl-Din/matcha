var express = require('express')
var router = express()
var User = require('../models/user.js')
var Check = require('../models/check.js')
var GetDb = require('../models/get_db.js')

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
            console.log(user_info)
            username = user_info['username'].toUpperCase()
           
            if (user_info['genre'] === 'B')
                user_info['genre'] = 'No gender'
            else
                user_info['genre'] === 'M' ? user_info['genre'] = 'I\'m a dick' : user_info['genre'] = 'I\'m a pussy'
            
            if (user_info['desire'] === 'B')
                user_info['desire'] = 'I like all'
            else
                user_info['desire'] === 'M' ? user_info['desire'] = 'I like dicks' : user_info['desire'] = 'I like pussies'
            
            
            res.render('pages/profil', {session :req.session, username: username, user: user_info})
        }).catch(catchError)
    }
    else 
        res.redirect('/error')
    
})


//Check email validity when user is typing
router.post('/first_email', (req, res) => {
    Check.EmailExists(req.body.profil_email)
    .then((exists) => {
        if (exists)
            return null
        else
            return Check.IsGoodEmail(req.body.profil_email)
    }).then((reg) => {
        if (reg === null)
            return res.send(true)
        else
            return res.send(false)    
    }).catch(catchError)
})

//Change firstname
router.post('/change_firstname', (req, res) => {
    if (req.body.profil_firstname && req.session.connected && req.session.connected.id){
        if (req.body.profil_firstname.length < 20){
            User.ChangeFirstName(req.session.connected.id, req.body.profil_firstname)
            .then((state) => {
                if (state === true)
                    res.send([true, req.body.profil_firstname])
                else
                    res.send([false, "Try again"])
            }).catch(catchError)
        }
        else
            res.send([false, "Too long"])
    }
    else
        res.send([false, "Empty field"])
})

//Change lastname
router.post('/change_lastname', (req, res) => {
    if (req.body.profil_lastname && req.session.connected.id){
        if (req.body.profil_lastname.length < 20){
            User.ChangeLastName(req.session.connected.id, req.body.profil_lastname)
            .then((state) => {
                if (state === true)
                    res.send([true, req.body.profil_lastname])
                else
                    res.send([false, "Try again"])
            }).catch(catchError)
        }
        else
            res.send([false, "Too long"])

    }
    else
        res.send([false, "Empty field"])
})

//Change email
router.post('/change_email', (req, res) => {
    if (req.body.profil_email && req.session.connected.id){
        if (req.body.profil_email.length < 199){
            Check.EmailExists(req.body.profil_email)
            .then((exists) => {
                if (exists === true)
                    res.send([false, 'Email already exists'])
                else
                    return Check.IsGoodEmail(req.body.profil_email)
            }).then((status) => {
                if (status === undefined)
                    return
                else if (status !== null)
                    return User.ChangeEmail(req.session.connected.id, req.body.profil_email)
                else if (status !== undefined)
                    res.send([false, 'Wrong email'])
            }).then((status) => {
                if (status === true)
                    res.send([true, req.body.profil_email])
                else if (status !== undefined)
                    res.send([false, 'Try again please'])
            }).catch(catchError)
        }
        else
            res.send([false, "Too long"])

    }
    else
        res.send([false, "Empty field"])
})

// Change gender
router.post('/change_gender', (req, res) => {
    if (req.body.profil_gender && req.session.connected.id && (req.body.profil_gender === 'B' || req.body.profil_gender === 'F' || req.body.profil_gender === 'M')){
        User.ChangeGender(req.session.connected.id, req.body.profil_gender)
        .then((status) => {
            if (status === true){
                var ret_msg
                if (req.body.profil_gender === 'B')
                    ret_msg = "No gender"
                else if (req.body.profil_gender === 'M')
                    ret_msg = "I\'m a dick"
                else if (req.body.profil_gender === 'F')
                    ret_msg = "I\'m a pussy"
                else
                    ret_msg = "?"
                res.send([true, ret_msg])
            }
            else
                res.send([false, "Try again please"])
        })
    }
    else
        res.send([false, "Empty field"])
})

// Change desire
router.post('/change_desire', (req, res) => {
    if (req.body.profil_desire && req.session.connected.id && (req.body.profil_desire === 'B' || req.body.profil_desire === 'F' || req.body.profil_desire === 'M')){
        User.ChangeDesire(req.session.connected.id, req.body.profil_desire)
        .then((status) => {
            if (status === true){
                var ret_msg
                if (req.body.profil_desire === 'B')
                    ret_msg = "I like all"
                else if (req.body.profil_desire === 'M')
                    ret_msg = "I like dicks"
                else if (req.body.profil_desire === 'F')
                    ret_msg = "I like pussies"
                else
                    ret_msg = "?"
                res.send([true, ret_msg])
            }
            else
                res.send([false, "Try again please"])
        })
    }
    else
        res.send([false, "Empty field"])
})

// Change bio
router.post('/change_desire', (req, res) => {
    if (req.body.profil_desire && req.session.connected.id && (req.body.profil_desire === 'B' || req.body.profil_desire === 'F' || req.body.profil_desire === 'M')){
        User.ChangeDesire(req.session.connected.id, req.body.profil_desire)
        .then((status) => {
            if (status === true){
                var ret_msg
                if (req.body.profil_desire === 'B')
                    ret_msg = "I like all"
                else if (req.body.profil_desire === 'M')
                    ret_msg = "I like dicks"
                else if (req.body.profil_desire === 'F')
                    ret_msg = "I like pussies"
                else
                    ret_msg = "?"
                res.send([true, ret_msg])
            }
            else
                res.send([false, "Try again please"])
        })
    }
    else
        res.send([false, "Empty field"])
})

//Change bio
router.post('/change_bio', (req, res) => {
    if (req.body.profil_bio && req.session.connected.id){
        if (req.body.profil_bio.length < 248){
            User.ChangeBio(req.session.connected.id, req.body.profil_bio)
            .then((state) => {
                if (state === true)
                    res.send([true, req.body.profil_bio])
                else
                    res.send([false, "Try again"])
            }).catch(catchError)
        }
        else
            res.send([false, "Too long"])

    }
    else
        res.send([false, "Empty field"])
})

// Return tags to print the page
router.get('/get_user_tags', (req, res) => {
    User.GetIdByUsername(req.query.username)
    .then((uid) => {
        return User.GetTags(uid)
    }).then((user_tags) => {
        res.send(user_tags)            
    }).catch(catchError)
})

// Del tags to print the page
// router.get('/del_user_tags', (req, res) => {
//     console.log(req)
//     // User.GetIdByUsername(req.query.username)
//     // .then((uid) => {
//         // return User.GetTags(uid)
//     // }).then((user_tags) => {
//         // res.send(user_tags)
//     // }).catch(catchError)
// })

// Get all the tags that matchs with the tag_search input to print the list
router.get('/get_all_tags', (req, res) => {
    console.log('req.query ' + req.query)    
    console.log('req.query.search ' + req.query.tag_search)
    GetDb.TagList(req.query.tag_search)
    .then((tag_list) => {
        res.send(tag_list)
    }).catch(catchError)
})

// Add a new tag
router.get('/add_tag', (req, res) => { 
    if (!req.session.connected || !req.session.connected.id) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'redirect_error'])
    if (!req.query.new_tag) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'New tag name is empty'])
    if (req.query.new_tag.length > 15)
        return res.send([false, 'New tag too long'])
    console.log('req.session.connected.id ' + req.session.connected.id)    
    console.log('req.query.search.new_tag ' + req.query.new_tag)
    User.AddTag(req.query.new_tag, req.session.connected.id)
    .then((status) => {
        if (status[0] === false)
            res.send([false, ''])
        else
            res.send([true, req.query.new_tag])
    }).catch(catchError)
})

// Delete a tag
router.get('/del_tag', (req, res) => { 
    console.log(req.query.tag_name);
    if (!req.session.connected || !req.session.connected.id) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'redirect_error'])
    if (!req.query.tag_name) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'Tag name is empty'])
    if (req.query.tag_name.length > 15)
        return res.send([false, 'Delete tag too long'])
    console.log('req.session.connected.id ' + req.session.connected.id)    
    console.log('req.query.search.tag_name ' + req.query.tag_name)
    User.DelTag(req.query.tag_name, req.session.connected.id)
    .then((status) => {
        if (status[0] === false)
            return res.send([false, ''])
        else
            return res.send([true, req.query.tag_name])
    }).catch(catchError)
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