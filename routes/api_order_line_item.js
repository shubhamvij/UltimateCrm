var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/order_line_items', function(req, res) {
        models.order_line_item.findAll({
            include: [
                {
                    model: models.order
                },
                {
                    model: models.product
                }
            ]
        }).then(function(order_line_items) {
            res.header('Content-Type', 'application/json');
            res.json(order_line_items);
        });
    });

    app.get('/api/order_line_item/:id', function(req, res) {
        const id = req.params.id;
        models.order_line_item.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.order
                },
                {
                    model: models.product
                }
            ]
        }).then(function(order_line_item) {
            if (order_line_item == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No order_line_item found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'order_line_item_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(order_line_item);
            }
        })
    });

    app.post('/api/order_line_item', function(req, res) {
        models.order_line_item.create({
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            price: req.body.price,
            order_id: req.body.order_id
        }).then(function(order_line_item) {
            res.header('Content-Type', 'application/json');
            res.json(order_line_item);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your order_line_item, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/order_line_item/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.order_line_item.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.order
                },
                {
                    model: models.product
                }
            ]
        }).then(function(order_line_item) {
            if (order_line_item == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No order_line_item found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return order_line_item.updateAttributes(updates).then(function(order_line_item) {
                    res.header('Content-Type', 'application/json');
                    res.json(order_line_item);
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
                        'message': 'There was an error when creating your order_line_item, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/order_line_item/:id', function(req, res) {
        const id = req.params.id;
        models.order_line_item.destroy({
            where: {
                id: id
            }
        }).then(function(order_line_item) {
            res.header('Content-Type', 'application/json');
            res.json(order_line_item);
        });
    });

}
