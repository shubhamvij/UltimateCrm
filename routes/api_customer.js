var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customers', function(req, res) {
        models.customer.findAll({
            include: [
                {
                    model: models.customer_contact_record
                },
                {
                    model: models.customer_information
                },
                {
                    model: models.customer_review
                }
            ]
        }).then(function(customers) {
            res.header('Content-Type', 'application/json');
            res.json(customers);
        });
    });

    app.get('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        models.customer.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer_contact_record
                },
                {
                    model: models.customer_information
                },
                {
                    model: models.customer_review
                }
            ]
        }).then(function(customer) {
            if (customer == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer);
            }
        })
    });

    app.post('/api/customer', function(req, res) {
        models.customer.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            office_phone: req.body.office_phone,
            other_phone: req.body.other_phone,
            other_phone_type: req.body.other_phone_type,
            title: req.body.title,
            department: req.body.department,
            company_id: req.body.company_id,
            account_manager_id: req.body.account_manager_id,
            fax: req.body.fax,
            email: req.body.email,
            office_address: req.body.office_address,
            description: req.body.description,
            generated_through_id: req.body.generated_through_id,
            est_lifetime_value: req.body.est_lifetime_value,
            amt_purchased: req.body.amt_purchased,
            notes: req.body.notes,
            customer_type_id: req.body.customer_type_id
        }).then(function(customer) {
            res.header('Content-Type', 'application/json');
            res.json(customer);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer.findOne({
            where: {
                id: id
            }
        }).then(function(customer) {
            if (customer == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_id'
                    }
                });
            } else {
                return customer.updateAttributes(updates).then(function(customer) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer);
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
                        'message': 'There was an error when creating your customer, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        models.customer.destroy({
            where: {
                id: id
            }
        }).then(function(customer) {
            res.header('Content-Type', 'application/json');
            res.json(customer);
        });
    });

}
