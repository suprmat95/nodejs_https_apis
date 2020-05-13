const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');


router.post('/users',user_controller.usersPost);

//router.get('/users',user_controller.usersGet)

module.exports = router;
