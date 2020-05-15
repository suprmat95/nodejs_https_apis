let jwt = require('jsonwebtoken');
const Resource = require('../models/resource.model');

let config = require('../config');
let cuid = require('cuid');

exports.create = function (req, res) {
// Validate request

    if(!req.body.data || req.body.data.length === 0) {
        res.statusCode = 400;
        res.json({
            success: false,
            message: "Resource data  can not be empty"
        });
    }

    // Create a resource
    const resource = new Resource({
        id: req.body.id || cuid(),
        data: req.body.data,
        created: Date.now(),
        modified: Date.now()

    });

    if(resource.data.length === 0) {
        res.statusCode = 400;
        res.json({
            success: false,
            message: "Error format in data field"
        });
    }
    // Save resource in the database
    resource.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || "Some error occurred while creating the Resource."
        });

    });
};

exports.findAll = (req, res) => {
    Resource.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || "Some error occurred while finding the Resources."
        });


    });
};

exports.findOne = (req, res) => {
    Resource.findOne({id: req.params.id})
        .then(resource => {
            if(!resource) {
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Resource not found with id " + req.params.id
                });
                return
            }
            res.send(resource);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.statusCode = 404;
            res.json({
                success: false,
                message: "Resource not found with id " + req.params.id
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
    if(!req.body.data || req.body.data.length === 0) {
        res.statusCode = 400;
        res.json({
            success: false,
            message: "Resource data can not be empty"
        });
        return
    }
    // Find note and update it with the request body
    Resource.findOneAndUpdate({id: req.params.id}, {
        data: req.body.data,
        modified: Date.now()
    }, {new: true})
        .then(resource => {
            if(!resource) {
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Resource not found with id " + req.params.id
                });
                return

            }
            if(resource.deleted!=null) {
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Resource deleted at this timestamp " + resource.deleted
                });
                return

            }

            res.send(resource);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.statusCode = 404;
            res.json({
                success: false,
                message: "Resource not found with id " + req.params.id
            });
            return
        }
        res.statusCode = 500;
        res.json({
            success: false,
            message: "Resource not found with id " + req.params.id
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Resource.findOneAndUpdate({id: req.params.id}, {
        data: [],
        modified: Date.now(),
        deleted: Date.now()
    }, {new: true})
        .then(resource => {
            if(!resource) {
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Resource not found with id " + req.params.id
                });
                return
            }
            if(resource.deleted!=null) {
                res.statusCode = 404;
                res.json({
                    success: false,
                    message: "Resource with id " + req.params.id + " already deleted at " +resource.deleted
                });
                return
            }
            res.send({message: "Resource deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.statusCode = 404;
            res.json({
                success: false,
                message: "Resource not found with id " + req.params.id
            });
            return
        }
        res.statusCode = 500;
        res.json({
            success: false,
            message: "Could not delete resource with id " + req.params.id
        });
    });
};
