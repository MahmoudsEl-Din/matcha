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

    static user(form) { // Where array contains info of the new user
        return new Promise((resolve, reject) => {
            Tools.HashPassword(form.password)
            .then((password_h) => {
                
                let sql = "INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`) VALUES(username = ?, name = ?, password = ?, lastname = ?, email = ?, genre = ?, desire = ?, bio = ?);"
                connection.query(sql, {'username': form.signup_username, 'name': form.signup_firstrname, 'password': password_h, 'lastname': form.signup_lastname, 'email': form.signup_email, 'genre': 'B', 'desire': 'B', 'bio': 'Unwritten yet'}, (error, results) => {
                    if (error) throw error
                    resolve(true)
                })
            }).catch(catchError)   
        })
    }
}

module.exports = addDb