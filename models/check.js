let catchError = (error) => {
    console.error(error)
}

class Check {
    static is_activate (username) {
        
    }

    static login_exists(username) {
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

    static is_good_pw(username, pw) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE username = ? AND password = ?"
            let pw_h = pw
            connection.query(sql, [username, pw_h], (error, results) => {
                if (error)
                    reject(error)
                if (results.length === 0)
                    resolve(false)
                else
                    resolve(true)
            })
        })
    }

    static connection(username, pw_h) {
        return new Promise((resolve, reject) => {
            this.login_exists(username)
                .then((exists) => {
                    return new Promise((resolve, reject) => {
                        if (exists === true) {
                            this.is_good_pw(username, pw_h)
                                .then((pw_state) => {
                                    if (pw_state === true)
                                        resolve(true)
                                }).catch(catchError)
                        }
                        resolve('Wrong username')
                    })
            }).catch(catchError)
        })
    }
}

module.exports = Check