let jwt = require('jsonwebtoken');
const Resource = require('../models/resource.model');
let config = require('../config');
let cuid = require('cuid');

exports.create = function (req, res) {
// Validate request
    if(!req.body.data) {
        res.statusCode = 400;
        res.json({
            success: false,
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

    // Save resource in the database
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
            message: err.message || "Some error occurred while retrieving Resource."
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
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Note not found with id " + req.params.id
                });
                return
            }
            res.send(resource);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.statusCode = 404;
            res.json({
                success: false,
                message: "Note not found with id " + req.params.id
            });
            return
        }
        res.statusCode = 500;
        res.json({
            success: false,
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Update a resource identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.data) {
        return res.status(400).send({
            message: "Resource content can not be empty"
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
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Resource.findOneAndUpdate({id: req.params.id}, {
        data: [],
        deleted: Date.now()
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "ResourceResource not found with id " + req.params.id
                });
            }
            res.send({message: "Resource deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Resource not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};