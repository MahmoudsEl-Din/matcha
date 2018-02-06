var express = require('express')
var router = express()
var User = require('../models/user.js')
var Check = require('../models/check.js')
var GetDb = require('../models/get_db.js')
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv')

let catchError = (error) => {
    console.error(error)
}

router.get('/', (req, res) => {
    let username = undefined
    if (req.session.connected.state !== false) {
        User.GetAllById(req.session.connected.id)
        .then((user_info) => {
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

router.get('/historic', (req, res) => {
    User.GetAllById(req.session.connected.id)
    .then((user_info) => {
        username = user_info['username'].toUpperCase()
        res.render('pages/historic', {session :req.session, username: username, user: user_info})
    }).catch(catchError)
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
            // User.generalUpdateUser('name', req.body.profil_firstname, req.session.connected.id)
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
    if (req.body.profil_lastname && req.session.connected && req.session.connected.id){
        if (req.body.profil_lastname.length < 20){
            // User.generalUpdateUser('lastname', req.body.profil_lastname, req.session.connected.id)
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
    if (req.body.profil_email && req.session.connected && req.session.connected.id){
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
                    // return User.generalUpdateUser('email', req.body.profil_email, req.session.connected.id)
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
    if (req.body.profil_gender && req.session.connected && req.session.connected.id && (req.body.profil_gender === 'B' || req.body.profil_gender === 'F' || req.body.profil_gender === 'M')){
        // User.generalUpdateUser('genre', req.body.profil_gender, req.session.connected.id)
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
        // User.generalUpdateUser('desire', req.body.profil_desire, req.session.connected.id)
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
    if (req.body.profil_desire && req.session.connected && req.session.connected.id && (req.body.profil_desire === 'B' || req.body.profil_desire === 'F' || req.body.profil_desire === 'M')){
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
    if (req.body.profil_bio && req.session.connected && req.session.connected.id){
        if (req.body.profil_bio.length < 248){
            // User.generalUpdateUser('bio', req.body.profil_bio, req.body.profil_bio)
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

//Change age
router.post('/change_age', (req, res) => {
    if (req.body.profil_age && req.session.connected && req.session.connected.id){
        if (req.body.profil_age <= 100 && req.body.profil_age >= 18){
            // User.generalUpdateUser('age', req.body.profil_age, req.session.connected.id)
            User.ChangeAge(req.session.connected.id, req.body.profil_age)
            .then((state) => {
                if (state === true)
                    res.send([true, req.body.profil_age])
                else
                    res.send([false, "Try again"])
            }).catch(catchError)
        }
        else
            res.send([false, "You must be between 18 and 100"])

    }
    else
        res.send([false, "Empty field"])
})

// Return tags to print the page
router.get('/get_user_tags', (req, res) => {
    if (req.session.connected && req.session.connected.id)
    {
        User.GetIdByUsername(req.query.username)
        .then((uid) => {
            return User.GetTags(uid)
        }).then((user_tags) => {
            res.send(user_tags)            
        }).catch(catchError)
    }
    else
        res.send()
})

// Del tags to print the page
// router.get('/del_user_tags', (req, res) => {
//     // User.GetIdByUsername(req.query.username)
//     // .then((uid) => {
//         // return User.GetTags(uid)
//     // }).then((user_tags) => {
//         // res.send(user_tags)
//     // }).catch(catchError)
// })

// Get all the tags that matchs with the tag_search input to print the list
router.get('/get_all_tags', (req, res) => {
    GetDb.TagList(req.query.tag_search)
    .then((tag_list) => {
        res.send(tag_list)
    }).catch(catchError)
})

// Add a new tag
router.get('/add_tag', (req, res) => { 
    if (!req.query.new_tag) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'New tag name is empty'])
    if (req.query.new_tag.length > 15)
        return res.send([false, 'New tag too long'])
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
    if (!req.query.tag_name) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'Tag name is empty'])
    if (req.query.tag_name.length > 15)
        return res.send([false, 'Delete tag too long'])
    User.DelTag(req.query.tag_name, req.session.connected.id)
    .then((status) => {
        if (status[0] === false)
            return res.send([false, ''])
        else
            return res.send([true, req.query.tag_name])
    }).catch(catchError)
})

router.post('/upload_picture', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        if (files.file === undefined)
            return res.send([false, 'Select a picture'])
        if (files.file.size > 5242880)
            return res.send([false, 'Picture has to be 5Mb or less  '])        
        var milliseconds = (new Date).getTime();
        if (files.file.type !== 'image/jpeg' && files.file.type !== 'image/jpg' && files.file.type !== 'image/png')
            return res.send([false, 'Only jpg, jpeg and png are accepted'])
        var oldpath = files.file.path
        var filename = req.session.connected.id + '_' + milliseconds + files.file.type.replace('image/','.')
        var newpath = __dirname.replace('routes', 'public/pictures/' + filename)
        mv(oldpath, newpath, function(err) {
            if (err) { throw err; }
            User.AddPicture(req.session.connected.id, filename)
            .then((ret) => {
                ret[2] = '/assets/pictures/' + filename
                return res.send(ret)
            }).catch(catchError)
        })
    })
})

router.post('/get_pictures', (req, res) => {
    User.GetAllPictures(req.session.connected.id)
    .then((ret) => {
        ret.forEach((elem) => {
            elem['filepath'] = '/assets/pictures/' + elem['picture_name']
        })
        return res.send(ret)
    }).catch(catchError)
})

router.get(('/del_picture'), (req, res) => {
    if (!req.query.position || req.query.position < 1 || req.query.position > 5) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'redirect_error'])
    User.RemovePicture(req.session.connected.id, req.query.position)
    .then((status) => {
        if (status === true)
            return res.send([true, null])
        else
            return res.send([false, null])
            
    }).catch(catchError)
})

router.get(('/set_profil_pic'), (req, res) => {
    if (!req.query.position || req.query.position < 1 || req.query.position > 5) // If user destroy cookie and then click on a add tag server's gonna crash if we don't check the req.session.connected
        return res.send([false, 'redirect_error'])
    User.SetProfilPicture(req.session.connected.id, req.query.position)
    .then((status) => {
        if (status[0] === true)
            return res.send([true, null])
        else
            return res.send([false, null])
            
    }).catch(catchError)
})

router.get(('/change_pos'), (req, res) => {
    if (!req.query.lat || !req.query.lng )
        User.SetPosByIp(req.session.connected.id)
        .then((ret) => {
            res.send(ret)
        }).catch(catchError)
    else
        User.SetPosByCoord(req.session.connected.id, req.query.lat, req.query.lng)
        .then((ret) => {
            res.send(ret)
        }).catch(catchError)
})



module.exports = router