var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_est_lifetime_values', function(req, res) {
        models.customer_est_lifetime_value.findAll({
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_est_lifetime_value) {
            res.header('Content-Type', 'application/json');
            res.json(customer_est_lifetime_value);
        });
    });

    app.get('/api/customer_est_lifetime_value/:id', function(req, res) {
        const id = req.params.id;
        models.customer_est_lifetime_value.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_est_lifetime_value) {
            if (customer_est_lifetime_value == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_est_lifetime_value found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_est_lifetime_value_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_est_lifetime_value);
            }
        })
    });

    app.post('/api/customer_est_lifetime_value', function(req, res) {
        models.customer_est_lifetime_value.create({
            customer_id: req.body.customer_id,
            date: req.body.date,
            value: req.body.value
        }).then(function(customer_est_lifetime_value) {
            res.header('Content-Type', 'application/json');
            res.json(customer_est_lifetime_value);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_est_lifetime_value, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_est_lifetime_value/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer_est_lifetime_value.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_est_lifetime_value) {
            if (customer_est_lifetime_value == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_est_lifetime_value found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_est_lifetime_value_id'
                    }
                });
            } else {
                return customer_est_lifetime_value.updateAttributes(updates).then(function(customer_est_lifetime_value) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_est_lifetime_value);
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
                        'message': 'There was an error when creating your customer_est_lifetime_value, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_est_lifetime_value/:id', function(req, res) {
        const id = req.params.id;
        models.customer_est_lifetime_value.destroy({
            where: {
                id: id
            }
        }).then(function(customer_est_lifetime_value) {
            res.header('Content-Type', 'application/json');
            res.json(customer_est_lifetime_value);
        });
    });

}
