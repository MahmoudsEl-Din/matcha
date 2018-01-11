var User = require('../models/user')

const catchError = error => {
    console.log(error)
} 

module.exports = {

    logged_needed: ((req, res, next) => {
      
        if (!req.session.connected || !req.session.connected.id || !req.session.connected.state){  
            req.session.connected = {'state': false, 'id': undefined}
            let message = ""
            return res.redirect('/error')
        }
        next();
    }),

    user_timer: ((req, res, next) => {

        if (req.session.connected && req.session.connected.id && req.session.connected.state){  
            User.ResetTimer(req.session.connected.id)
        }
        next();
    }),

    gender_needed: ((req, res, next) => {

        User
        .GetAllById(req.session.connected.id)
        .then(user_info => {
            if (user_info['genre'] === 'B') {
                let message = "Veuillez definir votre SEXE pour acceder à la recherche"
                return res.redirect('/error')
            }
        })
        .catch(catchError)
        next();
    })
};
