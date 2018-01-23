var express = require('express')
var router = express()
var User = require('../models/user.js')
var Check = require('../models/check.js')
var AddDb = require('../models/add_db.js')


let catchError = (error) => {
    console.error(error)
}

router.post('/', (req, res) => {
    var id = undefined
    if (req.body.username === '' || req.body.password === '' || req.body.cpassword === '')
        return res.send([false, 'Empty field(s)'])
    Check.LoginExists(req.body.username)
    .then((exists) => {
        if (exists)
            return Check.NewPasswordValid(req.body.password)
        else
            res.send([false, 'Login invalid'])
    }).then((pw_wrong) => {
        if (!pw_wrong){
            if (req.body.password === req.body.cpassword)
                return User.GetIdByUsername(req.body.username)
            else 
                res.send([false, 'Passwords don\'t match'])    
        }
        else
            res.send([false, 'Wrong password'])    
    }).then((userid) => {
        if (userid) {
            id = userid
            return Check.CodeExists(userid, req.body.code, 2)    
        }
        // else
        //     res.send([false, 'Try again'])
    }).then((ret) => {
        if (ret && id !== ret[1])
            res.send([false, 'Login and code doesn\'t match'])        
        else if (ret && ret[0] === true)
            return User.ChangePassword(ret[1], req.body.password)
        else if (ret)
            res.send([false, 'Code doesn\'t match'])
    }).then((password_changed) => {
        if (password_changed){
            return AddDb.RemoveCodeByCode(req.body.code, 2)
        }
        else if (password_changed === false)
            res.send([false, 'Try again'])
    }).then((ret) => {
        if (ret)
            res.send([true, 'Password has been changed'])        
    }).catch(catchError)
})

module.exports = router