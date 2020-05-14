let jwt = require('jsonwebtoken');
const User = require('../models/user.model');
let config = require('../config');
const bcrypt = require('bcrypt');

exports.login = function (req, res) {
    if(req.body.name==null || req.body.password ==null){
        res.statusCode = 400;
        res.json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
        return
    }
    User.findOne({name: req.body.name} , function(err, data){
        if(err){
            res.statusCode = 400;
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
            return
        }
        if(data ===null){
            res.statusCode = 403;
            res.json({
                success: false,
                message: 'Username not present in db or Password doesn t match ! Please check the request'
            });
        }
        else if(data.name === req.body.name) {
            bcrypt.compare(req.body.password, data.password, function(err, result) {
                if(err){
                    res.statusCode = 400;
                    res.json({
                        success: false,
                        message: 'Authentication failed! Please check the request format'
                    });
                    return
                }
                if (result) {
                    let token = jwt.sign({username: req.body.name},
                        config.secret,
                        {
                            expiresIn: '48h' // expires in 48 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                }
                else {
                    res.statusCode = 403;
                    res.json({
                        success: false,
                        message: 'Username not present in db or Password doesn t match! Please check the request'
                    });

                }
            });

        }

        // console.log(data[0].name);
    })

};

exports.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);

    }

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.statusCode = 400;
                res.json({
                    success: false,
                    message: 'Token is not valid'
                });

            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

