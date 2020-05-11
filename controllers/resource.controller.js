let jwt = require('jsonwebtoken');
const Resource = require('../models/resource.model');
let config = require('../config');
let cuid = require('cuid');

exports.create = function (req, res) {
// Validate request
    if(!req.body.data) {
        return res.status(400).send({
            message: "Resource content can not be empty"
        });
    }

    // Create a resource
    const resource = new Resource({
        id: req.body.id || cuid(),
        data: req.body.data,
        created: Date.now(),
        modified: Date.now()

    });

    // Save Note in the database
    resource.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Resource."
        });
    });
};

exports.findAll = (req, res) => {
    Resource.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.update = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.findOne = (req, res) => {
    Resource.findOne({id: req.params.id})
        .then(resource => {
            if(!resource) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            res.send(resource);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Update a resource identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.data) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // Find note and update it with the request body
    Resource.findOneAndUpdate({id: req.params.id}, {
        data: req.body.data,
        modified: Date.now()
    }, {new: true})
        .then(resource => {
            if(!resource) {
                return res.status(404).send({
                    message: "Resource not found with id " + req.params.id
                });
            }
            res.send(resource);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Resource not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating resource with id " + req.params.id
        });
    });
};
