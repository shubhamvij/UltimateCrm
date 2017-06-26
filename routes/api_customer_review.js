var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_reviews', function(req, res) {
        models.customer_review.findAll({
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_review) {
            res.header('Content-Type', 'application/json');
            res.json(customer_review);
        });
    });

    app.get('/api/customer_review/:id', function(req, res) {
        const id = req.params.id;
        models.customer_review.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_review) {
            if (customer_review == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company_review found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_review);
            }
        })
    });

    app.post('/api/customer_review', function(req, res) {
        models.customer_review.create({
            source: req.body.source,
            subject: req.body.subject,
            body: req.body.body,
            customer_id: req.body.customer_id,
            product_id: req.body.product_id
        }).then(function(customer_review) {
            res.header('Content-Type', 'application/json');
            res.json(customer_review);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_review, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_review/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer_review.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                }
            ]
        }).then(function(customer_review) {
            if (customer_review == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_review found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return customer_review.updateAttributes(updates).then(function(customer_review) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_review);
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
                        'message': 'There was an error when creating your customer_review, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_review/:id', function(req, res) {
        const id = req.params.id;
        models.customer_review.destroy({
            where: {
                id: id
            }
        }).then(function(customer_review) {
            res.header('Content-Type', 'application/json');
            res.json(customer_review);
        });
    });

}
