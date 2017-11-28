var check = require('./check.js')
var Tools = require('./tools.js')

let catchError = (error) => {
    console.error(error)
}

class addDb {

    // Fonction a supprimer elle est utilisé à l'initialisation de la DB 
    static add_user(array) { // Where array contains info of the new user
        
        let ret = [0, 0]

        return new Promise((resolve, reject) => {
            check.LoginExists(array['username'])
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

    static user(form, req) { // Where array contains info of the new user
        return new Promise((resolve, reject) => {
            var code = Tools.RandomString()            
            Tools.HashPassword(form.signup_password)
            .then((password_h) => {
                let sql = "INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`, `activate`) VALUES(" + connection.escape(form.signup_username) + ", " + connection.escape(form.signup_firstname) + ", " + connection.escape(password_h) + ", " + connection.escape(form.signup_lastname) + ", " + connection.escape(form.signup_email) + ", 'B', 'B', 'Unwritten yet', " + connection.escape(code) + ");"
                connection.query(sql, (error, results) => {
                    if (error) throw error
                })
            }).then(() => {
                var content = "Hi " + form.signup_username + ",Activate your account by clicking here :\n" + req.protocol + '://' + req.get('host') + "/account_verification?code=" + code + "\n"
                Tools.SendMail('arthur.fanneau@gmail.com', content)
            }).then(() => {
                resolve(true)                
            })
            .catch(catchError)
        })
    }

    static ActivateUser(code) {
        return new Promise((resolve, reject) => {
            let sql = "UPDATE users SET activate = 0 WHERE activate = ?"
            connection.query(sql, code, (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }
}

module.exports = addDb