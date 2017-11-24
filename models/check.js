const crypto = require('crypto');

let catchError = (error) => {
    console.error(error)
}

class Check {
    static is_activate (username) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE username = ? AND activate = 0"
            connection.query(sql, username, (error, results) => {
                if (error)
                    reject(error)
                if (results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }

    static LoginExists(username) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE username = ?"
            connection.query(sql, username, (error, results) => {
                if (error)
                    reject(error)
                if (results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }

    static EmailExists(email) {
        return new Promise((resolve, reject) => {
            var email_reg = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            let sql = "SELECT * FROM users WHERE email = ?"
            connection.query(sql, email, (error, results) => {
                if (error)
                    reject(error)
                if (results.length === 0 && email_reg !== null)
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
        var ret = []
        return new Promise((resolve, reject) => {
            this.LoginExists(username)
                .then((exists) => {
                    if (exists === true) {
                        return this.is_good_pw(username, pw_h)
                    }
                    else
                        resolve([false, "Wrong username"])
                })
                .then((pw_state) => {
                    if (pw_state === true)
                            resolve([true, username])
                        else
                            resolve([false, "Wrong password"])
                }).catch(catchError)
            })
    }
}

module.exports = Check