var check = require('./check.js')

let catchError = (error) => {
    console.error(error)
}

class addDb {

    static add_user(array) { // Where array contains info of the new user
        
        let ret = [0, 0]

        return new Promise((resolve, reject) => {
            check.login_exists(array['username'])
                .then((username_exists) => {
                    if (username_exists === true) {
                        ret[0] = "KO"
                        ret[1] = "Username already exists"
                        resolve(ret)
                    }
                    else {
                        return new Promise((resolve, reject) => {
                            check.email_exists(array['email'])
                                .then((email_exists) => {
                                    if (email_exists === true) {
                                        ret[0] = "KO"
                                        ret[1] = "Email already exists"
                                        resolve(ret)
                                    }
                                    else {
                                        let sql = 'INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`) VALUES(username = ?, name = ?, password = ?, lastname = ?, email = ?, genre = ?, desire = ?, bio = ?);'
                                        connection.query(sql, array, (error, results) => {
                                            if (error) throw error
                                            ret[0] = "OK"
                                            ret[1] = "User created"
                                            resolve(ret)
                                        })
                                    }
                            }).catch(catchError)
                        })
                    }
            }).catch(catchError)
        })
    }
}

module.exports = addDb