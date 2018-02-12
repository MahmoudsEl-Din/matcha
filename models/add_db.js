let Check = require('./check.js')
let Tools = require('./tools')
let User = require('./user')

let catchError = (error) => {
    console.error(error)
}

class addDb {

    static user(form, req) { // Where array contains info of the new user
        return new Promise((resolve, reject) => {
            var Tools = require('./tools')
            var User = require('./user.js')            
            var code = Tools.RandomString()
            var uid = undefined;           
            Tools.HashPassword(form.signup_password)
            .then((password_h) => {
                let sql = "INSERT INTO users (`username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`, `age`, `lat`, `lng`, `pop`) VALUES(" + connection.escape(form.signup_username) + ", " + connection.escape(form.signup_firstname) + ", " + connection.escape(password_h) + ", " + connection.escape(form.signup_lastname) + ", " + connection.escape(form.signup_email) + ", 'B', 'B', 'Unwritten yet', 25, 0, 0, 20);"
                connection.query(sql, (error, results) => {
                    if (error) throw error
                })
                return User.GetIdByUsername(form.signup_username)                
            }).then((userid) => {
                uid = userid
                return this.AddCode(userid, code, 1, 1)
            }).then((ret) => {
                if (ret[0] === true) {
                    let time = (new Date).getTime();
                    var content = "Hi " + form.signup_username + ",Activate your account by clicking here :\n" + req.protocol + '://' + req.get('host') + "/code_verif?code=" + code + "\n"
                    Tools.SendMail(form.signup_email , 'Matcha: account activation', content)
                    let sql = "INSERT INTO logged (`userid`, `time`, `logout`) VALUES(?, ?, 1);"
                    connection.query(sql, [uid, time], (error, results) => {
                        if (error) throw error
                    })
                        sql = "INSERT INTO sockets (`uid`, `socket_id`, `session_id`) VALUES(?, 'yipiyo', 'yipiyeah');"
                    connection.query(sql, [uid], (error, results) => {
                            if (error) throw error
                    })
                    return User.SetPosByIp(ret[1])
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

    static AddCode(userid, code, type, req){
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO code (userid, code, type) VALUES(?, ?, ?);"
            connection.query(sql, [userid, code, type], (error, results) => {
                if (error)
                    reject(error)
                if (req)
                    resolve([true, userid])
                else
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

    static RemoveCodeByCode(code, type) {
        return new Promise((resolve, reject) => {
            let sql = "DELETE FROM code WHERE code = ? AND type = ?"
            connection.query(sql, [code, type], (error, results) => {
                if (error)
                    reject(error)
                resolve(true)
            })
        })
    }

    static NewTagListIfNotExists(new_tag) {
        return new Promise((resolve, reject) => {
            let sql = "SELECT * FROM tag_list WHERE tag_name = ?;"
            connection.query(sql, [new_tag], (error, results) => {
                if (error)
                    reject(error)
                else if (!results[0]){
                    let sql = "INSERT INTO tag_list VALUES(null, ?);"
                    connection.query(sql, [new_tag], (error, results) => {
                    if (error)
                        reject(error)
                    resolve(true)
                    })
                }
                else       
                    resolve(false)
            })
        })
    }
}

module.exports = addDb