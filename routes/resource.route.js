const express = require('express');
const router = express.Router();

const resource_controller = require('../controllers/resource.controller');
const login_controller = require('../controllers/login.controller');
// Create a new resource
router.post('/resource', login_controller.checkToken, resource_controller.create);

// Retrieve all resource
router.get('/resource', login_controller.checkToken, resource_controller.findAll);

// Retrieve a single resource with id
router.get('/resource/:id',login_controller.checkToken, resource_controller.findOne);

// Update a resource with id
router.put('/resource/:id',login_controller.checkToken, resource_controller.update);

// Delete a resource with id
router.delete('/resource/:id', login_controller.checkToken, resource_controller.delete);


module.exports = router;
