var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/contact_type', function(req, res) {
        models.contact_type.findAll().then(function(contact_type) {
            res.header('Content-Type', 'application/json');
            res.json(contact_type);
        });
    });

    app.get('/api/contact_type/:id', function(req, res) {
        const id = req.params.id;
        models.contact_type.find({
            where: {
                id: id
            }
        }).then(function(contact_type) {
            if (contact_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No contact_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(contact_type);
            }
        })
    });

    app.post('/api/contact_type', function(req, res) {
        models.contact_type.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(contact_type) {
            res.header('Content-Type', 'application/json');
            res.json(contact_type);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your contact_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/contact_type/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.contact_type.findOne({
            where: {
                id: id
            }
        }).then(function(contact_type) {
            if (contact_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No contact_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                return contact_type.updateAttributes(updates).then(function(contact_type) {
                    res.header('Content-Type', 'application/json');
                    res.json(contact_type);
                });
            }
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your employee, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/contact_type/:id', function(req, res) {
        const id = req.params.id;
        models.contact_type.destroy({
            where: {
                id: id
            }
        }).then(function(contact_type) {
            res.header('Content-Type', 'application/json');
            res.json(contact_type);
        });
    });

}
