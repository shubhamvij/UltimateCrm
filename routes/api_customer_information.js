var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_informations', function(req, res) {
        models.customer_information.findAll({
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.customer_information_type
                }
            ]
        }).then(function(customer_informations) {
            res.header('Content-Type', 'application/json');
            res.json(customer_informations);
        });
    });

    app.get('/api/customer_information/:id', function(req, res) {
        const id = req.params.id;
        models.customer_information.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.customer_information_type
                }
            ]
        }).then(function(customer_information) {
            if (customer_information == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_information found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_information);
            }
        })
    });

    app.post('/api/customer_information', function(req, res) {
        models.customer_information.create({
            customer_id: req.body.customer_id,
            customer_information_type_id: req.body.customer_information_type_id,
            value: req.body.value,
        }).then(function(customer_information) {
            res.header('Content-Type', 'application/json');
            res.json(customer_information);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_information, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_information/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer_information.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.customer_information_type
                }
            ]
        }).then(function(customer_information) {
            if (customer_information == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_information found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return customer_information.updateAttributes(updates).then(function(customer_information) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_information);
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
                        'message': 'There was an error when creating your customer_information, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_information/:id', function(req, res) {
        const id = req.params.id;
        models.customer_information.destroy({
            where: {
                id: id
            }
        }).then(function(customer_information) {
            res.header('Content-Type', 'application/json');
            res.json(customer_information);
        });
    });

}
