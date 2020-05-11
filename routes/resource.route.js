const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const resource_controller = require('../controllers/resource.controller');
const login_controller = require('../controllers/login.controller');
// Create a new Note
router.post('/resource', login_controller.checkToken, resource_controller.create);

// Retrieve all Notes
//router.get('/resource', resource.findAll);

// Retrieve a single Note with noteId
//router.get('/resource/:resourceId', resource.findOne);

// Update a Note with noteId
//router.put('/resource/:resourceId', resource.update);

// Delete a Note with noteId
//router.delete('/resource/:resourceId', resource.delete);


module.exports = router;
