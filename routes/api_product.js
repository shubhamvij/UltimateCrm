var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/products', function(req, res) {
        models.product.findAll({
            include: [
                {
                    model: models.order_line_item
                },
                {
                    model: models.customer_review
                }
            ]
        }).then(function(products) {
            res.header('Content-Type', 'application/json');
            res.json(products);
        });
    });

    app.get('/api/product/:id', function(req, res) {
        const id = req.params.id;
        models.product.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.order_line_item
                },
                {
                    model: models.customer_review
                }
            ]
        }).then(function(product) {
            if (product == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No product found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'product_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(product);
            }
        })
    });

    app.post('/api/product', function(req, res) {
        models.product.create({
            sku: req.body.sku,
            trim: req.body.trim,
            color: req.body.color,
            inventory: req.body.inventory
        }).then(function(product) {
            res.header('Content-Type', 'application/json');
            res.json(product);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your product, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/product/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.product.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.order_line_item
                },
                {
                    model: models.customer_review
                }
            ]
        }).then(function(product) {
            if (product == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No product found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return product.updateAttributes(updates).then(function(product) {
                    res.header('Content-Type', 'application/json');
                    res.json(product);
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
                        'message': 'There was an error when creating your product, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/product/:id', function(req, res) {
        const id = req.params.id;
        models.product.destroy({
            where: {
                id: id
            }
        }).then(function(product) {
            res.header('Content-Type', 'application/json');
            res.json(product);
        });
    });

}
