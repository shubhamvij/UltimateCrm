var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_types', function(req, res) {
        models.customer_type.findAll({
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_types) {
            res.header('Content-Type', 'application/json');
            res.json(customer_types);
        });
    });

    app.get('/api/customer_type/:id', function(req, res) {
        const id = req.params.id;
        models.customer_type.find({
            where: {
                id: id
            }
        }).then(function(customer_type) {
            if (customer_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_type);
            }
        })
    });

    app.post('/api/customer_type', function(req, res) {
        models.customer_type.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(customer_type) {
            res.header('Content-Type', 'application/json');
            res.json(customer_type);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_type/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer_type.findOne({
            where: {
                id: id
            }
        }).then(function(customer_type) {
            if (customer_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                return customer_type.updateAttributes(updates).then(function(customer_type) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_type);
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
                        'message': 'There was an error when creating your customer_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_type/:id', function(req, res) {
        const id = req.params.id;
        models.customer_type.destroy({
            where: {
                id: id
            }
        }).then(function(customer_type) {
            res.header('Content-Type', 'application/json');
            res.json(customer_type);
        });
    });

}
