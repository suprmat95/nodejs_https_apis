const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
exports.usersPost = function (req, res) {
    const user = new User({name: req.body.name, password: req.body.password});
    User.findOne({name: req.body.name} , function(err, data){
        if(err){
            console.log(err);
            return
        }
        if(data === null) {
            console.log("No record found");
            user.save(function (err, result) {
                if (err) return res.send(err);
                else res.send('OK')
            });
            return
        }
        else
            res.statusCode = 403;
            res.send('Name already in db');
        // console.log(data[0].name);
    })
};
//exports.usersGet = function (req, res) {
//    User.findOne({name: req.body.name} , function(err, data){
//        if(err){
//            console.log(err);
//            return
//        }
//
//        if(data.length === 0) {
//            console.log("No record found")
//            return
//        }
//        res.send(data);
//
//       // console.log(data[0].name);
//    })
//};
