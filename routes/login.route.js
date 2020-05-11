const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const login_controller = require('../controllers/login.controller');

router.get('/login', login_controller.login);

module.exports = router;
