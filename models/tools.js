var check = require('./check.js')

let catchError = (error) => {
    console.error(error)
}

class Tools {

    static HashPassword(password){
        return Promise((resolve, reject) => {
            crypto.pbkdf2(pw, '6D23353B24DB5BEB57274F18FCABDB73', 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) throw err;
                resolve (derivedKey.toString('hex'))
            })
        })
    }
}

module.exports = Tools