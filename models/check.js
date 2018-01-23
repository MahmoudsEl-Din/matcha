const crypto = require('crypto');
const AddDb = require('./add_db');
const User = require('./user')

let catchError = (error) => {
    console.error(error)
}

class Check {
    static CodeExists(userid, code, type) {
        return new Promise((resolve, reject) => {
            if (code === false) {
                let sql = 'SELECT * FROM code WHERE userid = ? AND type = ?'
                connection.query(sql, [userid, type], (error, results) => {
                    if (error)
                        reject(error)
                    if (results.length === 0)
                        resolve(false)
                    else
                        resolve(true)
                })    
            }
            else {
                let sql = 'SELECT * FROM code WHERE code = ?'
                connection.query(sql, code, (error, results) => {
                    if (error)
                        reject(error)
                    if (results.length === 0)
                        resolve([false])
                    else
                        resolve([true, results[0].userid, results[0].type])
                })
            }
        })
    }

    static is_activate (userid) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM code WHERE userid = ? AND type = 1"
            connection.query(sql, userid, (error, results) => {
                if (error)
                    reject(error)
                if (results && results.length === 0)
                    resolve(true)
                else
                    resolve(false)
            })
        })
    }

    static LoginExists(username) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE username = ?"
            connection.query(sql, username, (error, results) => {
                if (error)
                    reject(error)
                if (results && results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }

    static IsGoodEmail(email){
        return new Promise((resolve, reject) => {
            var email_reg = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            resolve(email_reg)
        })
    }

    static EmailExists(email) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE email = ?"
            connection.query(sql, email, (error, results) => {
                if (error)
                    reject(error)
                if (results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }
    static NewPasswordValid(password) {
        return new Promise((resolve, reject) => {
            var password_reg = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
            if (password_reg !== null)
                resolve(false)
            else
                resolve(true)
        })
    }

    static is_good_pw(username, pw) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE username = ? AND password = ?"
            crypto.pbkdf2(pw, '6D23353B24DB5BEB57274F18FCABDB73', 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) throw err;
                var pw_h = derivedKey.toString('hex')
                connection.query(sql, [username, pw_h], (error, results) => {
                    if (error)
                        reject(error)
                    if (results.length === 0)
                        resolve(false)
                    else
                        resolve(true)
                })
            })
        })
    }

    static connection(username, pw_h) {
        return new Promise((resolve, reject) => {
            let User = require('./user')            
            this.LoginExists(username)
                .then((exists) => {
                    if (exists === true) {
                        return this.is_good_pw(username, pw_h)
                    }
                    else
                        resolve([false, "Wrong username"])
                }).then((pw_state) => {
                    if (pw_state === true)
                        return User.GetIdByUsername(username)
                    else
                        resolve([false, "Wrong password"])
                }).then((id) => {
                    if (id)
                        return this.is_activate(id)
                }).then((activate) => {
                    if (activate === true)
                        resolve([true, username])
                    else {
                        resolve([false, "Account not activated"])
                    }            
                }).catch(catchError)
            })
    }

    static CreateAccount(form) {
        return new Promise((resolve, reject) => {
            this.LoginExists(form.signup_username)
            .then((exists) => {
                if (exists)
                    resolve([false, "Username already exists"])
                else
                    return(this.EmailExists(form.signup_email))    
            }).then((exists) => {
                if (exists)
                    resolve([false, "Email already exists"])
                else
                    return(this.IsGoodEmail(form.signup_email))
            }).then((reg) => {
                if (reg === null)
                    resolve([false, "Email invalid"])
                else
                    return(this.NewPasswordValid(form.signup_password))    
            }).then ((invalid) => {
                if (invalid)
                    resolve([false, "Password is invalid"])
                else if (form.signup_password !== form.signup_cpassword)
                    resolve([false, "Passwords are differents"])
                else
                    resolve([true])
            })
        })
    }

    static PictureExists(userid, position) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM pictures WHERE userid = ? AND position = ?;"
            connection.query(sql, [userid, position], (error, results) => {
                if (error)
                    reject(error)
                if (!results || results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }
}

module.exports = Check