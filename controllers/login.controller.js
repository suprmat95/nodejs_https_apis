let jwt = require('jsonwebtoken');
const User = require('../models/user.model');
let config = require('../config');

exports.login = function (req, res) {
    User.findOne({name: req.body.name, password: req.body.password} , function(err, data){
        if(err){
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
            return
        }
        if(data.name === req.body.name && data.password === req.body.password) {
            let token = jwt.sign({username: req.body.name},
                config.secret,
                { expiresIn: '48h' // expires in 48 hours
                }
            );
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        }
        else
            res.send(403).json({
                success: false,
                message: 'Incorrect username or password'
            });
        // console.log(data[0].name);
    })

};
