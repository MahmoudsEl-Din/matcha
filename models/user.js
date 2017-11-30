var Tools = require('./tools')
var AddDb = require('./add_db')

let catchError = (error) => {
    console.error(error)
}

class User {
    static ResetEmail(id, link){
        return new Promise((resolve, reject) => {
            var code = Tools.RandomString()
            Tools.CreateCode(id, code, 2)
            .then((status) => {
                if (status){
                    return User.GetAllById(id)
                }
                reject()
            }).then((user) => {
                Tools.SendMail("arthur.fanneau@gmail.com", "Matcha: password reset","Hi " + user['username'] + ",\nTo reset your password click this link :\n" + link + code)
                resolve(true)
            }).catch(catchError)
        })
    }

    static GetAllById(id){
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM users WHERE id = ?"
            connection.query(sql, id, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0])
                resolve(undefined)
            })
        })
    }

    static GetIdByEmail(email){
        return new Promise((resolve, reject) => {
            let sql = "SELECT id FROM users WHERE email = ?"
            connection.query(sql, email, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0]['id'])
                resolve(undefined)
            })
        })
    }

    static GetIdByUsername(username){
        return new Promise((resolve, reject) => {
            let sql = "SELECT id FROM users WHERE username = ?"
            connection.query(sql, username, (error, results) => {
                if (error)
                    reject(error)
                else if (results[0])
                    resolve(results[0]['id'])
                resolve(undefined)
            })
        })
    }
}

module.exports = User