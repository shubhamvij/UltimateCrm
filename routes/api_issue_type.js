var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/issue_types', function(req, res) {
        models.issue_type.findAll().then(function(issue_types) {
            res.header('Content-Type', 'application/json');
            res.json(issue_types);
        });
    });

    app.get('/api/issue_type/:id', function(req, res) {
        const id = req.params.id;
        models.issue_type.find({
            where: {
                id: id
            }
        }).then(function(issue_type) {
            if (issue_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No issue_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'issue_type_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(issue_type);
            }
        })
    });

    app.post('/api/issue_type', function(req, res) {
        models.issue_type.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(issue_type) {
            res.header('Content-Type', 'application/json');
            res.json(issue_type);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your issue_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/issue_type/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.issue_type.findOne({
            where: {
                id: id
            }
        }).then(function(issue_type) {
            if (issue_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No issue_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                return issue_type.updateAttributes(updates).then(function(issue_type) {
                    res.header('Content-Type', 'application/json');
                    res.json(issue_type);
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
                        'message': 'There was an error when creating your issue_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/issue_type/:id', function(req, res) {
        const id = req.params.id;
        models.issue_type.destroy({
            where: {
                id: id
            }
        }).then(function(issue_type) {
            res.header('Content-Type', 'application/json');
            res.json(issue_type);
        });
    });

}
