const User = require('../models/user.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
exports.users = function (req, res) {
    const user = new User({name: req.body.name, password: req.body.password});
    user.save(function (err, result) {
        if (err) return res.send(err);
        else res.send('OK')
    });
};
