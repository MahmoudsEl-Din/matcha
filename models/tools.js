var crypto = require('crypto')
var nodemailer = require('nodemailer')
var Check = require('./check.js')
var AddDb = require('./add_db')

let catchError = (error) => {
    console.error(error)
}

class Tools {
    static CreateCode(userid, code, type) {
        return new Promise ((resolve, reject) => {
            Check.CodeExists(userid, false, type)
            .then((exists) => {
                if (exists)
                    return AddDb.RemoveCode(userid, type)
                return true
            }).then((state) => {
                if (state === true){
                    return AddDb.AddCode(userid, code, type, null)
                }
                else
                    reject()
            }).then((state) => {
                if (state === true)
                    resolve(true)
                else
                    reject()
            }).catch(catchError)
        })
    }

    static HashPassword(password){
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, '6D23353B24DB5BEB57274F18FCABDB73', 100000, 64, 'sha512', (err, derivedKey) => {
                if (err) throw err
                console.log(derivedKey.toString('hex'))
                resolve(derivedKey.toString('hex'))
            })
        })
    }

    static RandomString(){
      var text = ""
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return(text)
    }

    static SendMail(receiver, subject,content){
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'afanneau.matcha@gmail.com',
            pass: 'matchac1projetdeouf'
          }
        })
        
        var mailOptions = {
          from: 'support@matcha.com',
          to: receiver,
          subject: subject,
          text: content + "\n\nStaff of matcha"
        }
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })
    }

    static SelectInArray(array, key_array, str){ // Take an array and return an other array created by all the elements that matchs with the str
        return new Promise((resolve, reject) => {
            var new_array = []
            var i = 0
            array.forEach((element) => {
                if (element[key_array].startsWith(str)) {
                    new_array[i] = element[key_array]
                    i++
                }
            })
            resolve(new_array)
        })
    }
}

module.exports = Tools