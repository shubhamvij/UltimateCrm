var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/opportunities_employees', function(req, res) {
        models.opportunities_employee.findAll({
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.opportunity
                },
                {
                    model: models.employee
                }
            ]
        }).then(function(opportunities_employees) {
            res.header('Content-Type', 'application/json');
            res.json(opportunities_employees);
        });
    });

    app.get('/api/opportunities_employee/:id', function(req, res) {
        const id = req.params.id;
        models.opportunities_employee.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.opportunity
                },
                {
                    model: models.employee
                }
            ]
        }).then(function(opportunities_employee) {
            if (opportunities_employee == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No opportunities_employee found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(opportunities_employee);
            }
        })
    });

    app.post('/api/opportunities_employee', function(req, res) {
        models.opportunities_employee.create({
            opportunity_id: req.body.opportunity_id,
            customer_id: req.body.customer_id,
            account_manager_id: req.body.account_manager_id
        }).then(function(opportunities_employee) {
            res.header('Content-Type', 'application/json');
            res.json(opportunities_employee);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your opportunities_employee, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/opportunities_employee/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.opportunities_employee.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.customer
                },
                {
                    model: models.opportunity
                },
                {
                    model: models.employee
                }
            ]
        }).then(function(opportunities_employee) {
            if (opportunities_employee == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No opportunities_employee found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return opportunities_employee.updateAttributes(updates).then(function(opportunities_employee) {
                    res.header('Content-Type', 'application/json');
                    res.json(opportunities_employee);
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
                        'message': 'There was an error when creating your opportunities_employee, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/opportunities_employee/:id', function(req, res) {
        const id = req.params.id;
        models.opportunities_employee.destroy({
            where: {
                id: id
            }
        }).then(function(opportunities_employee) {
            res.header('Content-Type', 'application/json');
            res.json(opportunities_employee);
        });
    });

}
