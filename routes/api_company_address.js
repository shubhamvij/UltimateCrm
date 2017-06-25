var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/company_addresses', function(req, res) {
        models.company_address.findAll({
            include: [{
                model: models.company
            }]
        }).then(function(company_address) {
            res.header('Content-Type', 'application/json');
            res.json(company_address);
        });
    });

    app.get('/api/company_address/:id', function(req, res) {
        const id = req.params.id;
        models.company_address.find({
            where: {
                id: id
            },
            include: [{
                model: models.company
            }]
        }).then(function(company_address) {
            if (company_address == null) {
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
                res.json(company_address);
            }
        })
    });

    app.post('/api/company_address', function(req, res) {
        models.company_address.create({
            address_line_one: req.body.address_line_one,
            address_line_two: req.body.address_line_two,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            postal_code: req.body.postal_code,
            company_id: req.body.company_id,
            address_type: req.body.address_type
        }).then(function(company_address) {
            res.header('Content-Type', 'application/json');
            res.json(company_address);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your company_address, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/company_address/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.company_address.findOne({
            where: {
                id: id
            },
            include: [{
                model: models.company
            }]
        }).then(function(company_address) {
            if (company_address == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company_address found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return company_address.updateAttributes(updates).then(function(company_address) {
                    res.header('Content-Type', 'application/json');
                    res.json(company_address);
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
                        'message': 'There was an error when creating your employee, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/company_address/:id', function(req, res) {
        const id = req.params.id;
        models.company_address.destroy({
            where: {
                id: id
            }
        }).then(function(company_address) {
            res.header('Content-Type', 'application/json');
            res.json(company_address);
        });
    });

}
