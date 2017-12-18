var User = require('../models/user')

module.exports = {
    logged_needed: ((req, res, next) => {
        console.log('IN THE MIDDLEWARES')        
        if (!req.session.connected || !req.session.connected.id || !req.session.connected.state){  
            req.session.connected = {'state': false, 'id': undefined}
            return res.redirect('/error')
        }
        next();
    }),

    user_timer: ((req, res, next) => {
        if (req.session.connected && req.session.connected.id && req.session.connected.state){  
            User.ResetTimer(req.session.connected.id)
        }
        next();
    })
};
