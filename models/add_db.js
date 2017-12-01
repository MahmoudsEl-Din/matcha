let Check = require('./check.js')
let Tools = require('./tools')
let User = require('./user')

let catchError = (error) => {
    console.error(error)
}

class addDb {

    // Fonction a supprimer elle est utilisé à l'initialisation de la DB 
    // static add_user(array) { // Where array contains info of the new user
        
    //     let ret = [0, 0]

    //     return new Promise((resolve, reject) => {
    //         Check.LoginExists(array['username'])
    //             .then((username_exists) => {
    //                 if (username_exists === true) {
    //                     ret[0] = "KO"
    //                     ret[1] = "Username already exists"
    //                     resolve(ret)
    //                 }
    //                 else {
    //                     return new Promise((resolve, reject) => {
    //                         Check.email_exists(array['email'])
    //                             .then((email_exists) => {
    //                                 if (email_exists === true) {
    //                                     ret[0] = "KO"
    //                                     ret[1] = "Email already exists"
    //                                     resolve(ret)
    //                                 }
    //                                 else {
    //                                     let sql = 'INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`) VALUES(username = ?, name = ?, password = ?, lastname = ?, email = ?, genre = ?, desire = ?, bio = ?);'
    //                                     connection.query(sql, array, (error, results) => {
    //                                         if (error) throw error
    //                                         ret[0] = "OK"
    //                                         ret[1] = "User created"
    //                                         resolve(ret)
    //                                     })
    //                                 }
    //                         }).catch(catchError)
    //                     })
    //                 }
    //         }).catch(catchError)
    //     })
    // }

    static user(form, req) { // Where array contains info of the new user
        return new Promise((resolve, reject) => {
            var Tools = require('./tools')
            var User = require('./user.js')            
            var code = Tools.RandomString()            
            Tools.HashPassword(form.signup_password)
            .then((password_h) => {
                let sql = "INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`) VALUES(" + connection.escape(form.signup_username) + ", " + connection.escape(form.signup_firstname) + ", " + connection.escape(password_h) + ", " + connection.escape(form.signup_lastname) + ", " + connection.escape(form.signup_email) + ", 'B', 'B', 'Unwritten yet');"
                connection.query(sql, (error, results) => {
                    if (error) throw error
                })
                return User.GetIdByUsername(form.signup_username)                
            }).then((userid) => {
                console.log('\n'+userid)
                return this.AddCode(userid, code, 1)
            }).then((ret) => {
                if (ret === true) {
                    var content = "Hi " + form.signup_username + ",Activate your account by clicking here :\n" + req.protocol + '://' + req.get('host') + "/code_verif?code=" + code + "\n"
                    Tools.SendMail('arthur.fanneau@gmail.com', 'Matcha: account activation', content)
                }
                else
                    reject()
                }).then(() => {
                resolve(true)                
            }).catch(catchError)
        })
    }

    static ActivateCode(code) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM code WHERE code = ?;"
            connection.query(sql, code, (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static AddCode(userid, code, type){
        return new Promise((resolve, reject) => {
            console.log(userid)
            console.log(code)
            console.log(type)            
            let sql = "INSERT INTO code (userid, code, type) VALUES(?, ?, ?);"
            connection.query(sql, [userid, code, type], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static RemoveCode(userid, type) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM code WHERE userid = ? AND type = ?"
            connection.query(sql, [userid, type], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }
}

module.exports = addDb