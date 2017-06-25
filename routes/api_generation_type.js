var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/generation_types', function(req, res) {
        models.generation_type.findAll().then(function(generation_types) {
            res.header('Content-Type', 'application/json');
            res.json(generation_types);
        });
    });

    app.get('/api/generation_type/:id', function(req, res) {
        const id = req.params.id;
        models.generation_type.find({
            where: {
                id: id
            }
        }).then(function(generation_type) {
            if (generation_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No generation_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'generation_type_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(generation_type);
            }
        })
    });

    app.post('/api/generation_type', function(req, res) {
        models.generation_type.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(generation_type) {
            res.header('Content-Type', 'application/json');
            res.json(generation_type);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your generation_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/generation_type/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.generation_type.findOne({
            where: {
                id: id
            }
        }).then(function(generation_type) {
            if (generation_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No generation_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                return generation_type.updateAttributes(updates).then(function(generation_type) {
                    res.header('Content-Type', 'application/json');
                    res.json(generation_type);
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
                        'message': 'There was an error when creating your generation type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/generation_type/:id', function(req, res) {
        const id = req.params.id;
        models.generation_type.destroy({
            where: {
                id: id
            }
        }).then(function(generation_type) {
            res.header('Content-Type', 'application/json');
            res.json(generation_type);
        });
    });

}
