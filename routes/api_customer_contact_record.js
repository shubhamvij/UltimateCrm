var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/customer_contact_records', function(req, res) {
        models.customer_contact_record.findAll({
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.employee
                },
                {
                    model: models.contact_type
                }
            ]
        }).then(function(customer_contact_record) {
            res.header('Content-Type', 'application/json');
            res.json(customer_contact_record);
        });
    });

    app.get('/api/customer_contact_record/:id', function(req, res) {
        const id = req.params.id;
        models.customer_contact_record.find({
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
                    model: models.contact_type
                }
            ]
        }).then(function(customer_contact_record) {
            if (customer_contact_record == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company address found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer_contact_record);
            }
        })
    });

    app.post('/api/customer_contact_record', function(req, res) {
        models.customer_contact_record.create({
            customer_id: req.body.customer_id,
            employee_id: req.body.employee_id,
            contact_type_id: req.body.contact_type_id,
            subject: req.body.subject,
            start_date_time: req.body.start_date_time,
            end_date_time: req.body.end_date_time,
            description: req.body.description,
            notes: req.body.notes
        }).then(function(customer_contact_record) {
            res.header('Content-Type', 'application/json');
            res.json(customer_contact_record);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer_contact_record, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer_contact_record/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer_contact_record.findOne({
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
                    model: models.contact_type
                }
            ]
        }).then(function(customer_contact_record) {
            if (customer_contact_record == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer_contact_record found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return customer_contact_record.updateAttributes(updates).then(function(customer_contact_record) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer_contact_record);
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
                        'message': 'There was an error when creating your customer_contact_record, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer_contact_record/:id', function(req, res) {
        const id = req.params.id;
        models.customer_contact_record.destroy({
            where: {
                id: id
            }
        }).then(function(customer_contact_record) {
            res.header('Content-Type', 'application/json');
            res.json(customer_contact_record);
        });
    });

}
