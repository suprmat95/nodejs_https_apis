let jwt = require('jsonwebtoken');
const resource = require('../models/resource.model');
let config = require('../config');

exports.create = function (req, res) {
    res.send('Greetings from the Test controller!');
};
exports.update = function (req, res) {
    res.send('Greetings from the Test controller!');
};
