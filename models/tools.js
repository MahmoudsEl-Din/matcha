var crypto = require('crypto')
var nodemailer = require('nodemailer');
var check = require('./check.js')

let catchError = (error) => {
    console.error(error)
}

class Tools {
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
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
              
                for (var i = 0; i < 10; i++)
                  text += possible.charAt(Math.floor(Math.random() * possible.length))
              
                return(text)
    }

    static SendMail(receiver, content){
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
          subject: 'Matcha: account activation',
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
}

module.exports = Tools