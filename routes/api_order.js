var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/orders', function(req, res) {
        models.order.findAll({
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.employee
                },
                {
                    model: models.order_line_item
                }
            ]
        }).then(function(orders) {
            res.header('Content-Type', 'application/json');
            res.json(orders);
        });
    });

    app.post('/api/integration/orders', function(req, res) {
        var skus = []
        console.log("Just got order from SM");
        console.log(req.body);
        for (var i = 0; i < req.body.skus_purchased.length; i++) {
            for(var k in req.body.skus_purchased[i]) {
                if(req.body.skus_purchased[i].hasOwnProperty(k)) {
                    skus.push(k);
                }
            }
        }
        console.log(skus);
        models.product.findAll({
            where: {
                sku: {
                    $in: skus
                }
            }
        }).then(function(products) {
            var product_map = {};
            for(var i = 0; i < products.length; i++) {
                product_map[products[i].sku] = products[i].id;
            }
            models.order.create({
                id: req.body.id,
                customer_id: req.body.customer_id,
                account_manager_id: req.body.sales_rep_id,
                notes: req.body.customer_notes,
                total: req.body.total_sales
            }).then(function(order) {
                for(i = 0; i < req.body.skus_purchased.length; i++) {
                    for(var k in req.body.skus_purchased[i]) {
                        if(req.body.skus_purchased[i].hasOwnProperty(k)) {
                            models.order_line_item.create({
                                product_id: product_map[k],
                                quantity: req.body.skus_purchased[i][k],
                                order_id: order.id
                            });
                        }
                    }
                }
                res.end();
            });
        });
    });

    app.get('/api/order/:id', function(req, res) {
        const id = req.params.id;
        models.order.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.employee
                },
                {
                    model: models.order_line_item
                }
            ]
        }).then(function(order) {
            if (order == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No order found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'order_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(order);
            }
        })
    });

    app.post('/api/order', function(req, res) {
        models.order.create({
            customer_id: req.body.customer_id,
            account_manager_id: req.body.account_manager_id,
            total: req.body.total,
            date: req.body.date,
            notes: req.body.notes
        }).then(function(order) {
            res.header('Content-Type', 'application/json');
            res.json(order);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your order, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/order/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.order.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.employee
                },
                {
                    model: models.order_line_item
                }
            ]
        }).then(function(order) {
            if (order == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No order found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return order.updateAttributes(updates).then(function(order) {
                    res.header('Content-Type', 'application/json');
                    res.json(order);
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
                        'message': 'There was an error when creating your order, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/order/:id', function(req, res) {
        const id = req.params.id;
        models.order.destroy({
            where: {
                id: id
            }
        }).then(function(order) {
            res.header('Content-Type', 'application/json');
            res.json(order);
        });
    });

}
