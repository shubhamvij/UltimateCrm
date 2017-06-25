var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/companies', function(req, res) {
        models.company.findAll().then(function(companies) {
            res.header('Content-Type', 'application/json');
            res.json(companies);
        });
    });

    app.get('/api/company/:id', function(req, res) {
        const id = req.params.id;
        models.company.find({
            where: {
                id: id
            }
        }).then(function(company) {
            if (company == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(company);
            }
        })
    });

    app.post('/api/company', function(req, res) {
        models.company.create({
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            website: req.body.website,
            country: req.body.country,
            account_manager_id: req.body.account_manager_id
        }).then(function(company) {
            res.header('Content-Type', 'application/json');
            res.json(company);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your company, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/company/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.company.findOne({
            where: {
                id: id
            }
        }).then(function(company) {
            if (company == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_id'
                    }
                });
            } else {
                return company.updateAttributes(updates).then(function(company) {
                    res.header('Content-Type', 'application/json');
                    res.json(company);
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
                        'message': 'There was an error when creating your company, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/company/:id', function(req, res) {
        const id = req.params.id;
        models.company.destroy({
            where: {
                id: id
            }
        }).then(function(company) {
            res.header('Content-Type', 'application/json');
            res.json(company);
        });
    });

}
