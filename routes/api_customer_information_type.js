var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_information_types', function(req, res) {
        models.customer_information_type.findAll().then(function(customer_information_types) {
            res.header('Content-Type', 'application/json');
            res.json(customer_information_types);
        });
    });

    app.get('/api/customer_information_type/:id', function(req, res) {
        const id = req.params.id;
        models.customer_information_type.find({
            where: {
                id: id
            }
        }).then(function(customer_information_type) {
            if (customer_information_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_information_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_information_type);
            }
        })
    });

    app.post('/api/customer_information_type', function(req, res) {
        models.customer_information_type.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(customer_information_type) {
            res.header('Content-Type', 'application/json');
            res.json(customer_information_type);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_information_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_information_type/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        console.log(updates);
        models.customer_information_type.findOne({
            where: {
                id: id
            }
        }).then(function(customer_information_type) {
            if (customer_information_type == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_information_type found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_type_id'
                    }
                });
            } else {
                return customer_information_type.updateAttributes(updates).then(function(customer_information_type) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_information_type);
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
                        'message': 'There was an error when creating your customer_information_type, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_information_type/:id', function(req, res) {
        const id = req.params.id;
        models.customer_information_type.destroy({
            where: {
                id: id
            }
        }).then(function(customer_information_type) {
            res.header('Content-Type', 'application/json');
            res.json(customer_information_type);
        });
    });

}
