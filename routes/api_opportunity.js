var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/opportunities', function(req, res) {
        models.opportunity.findAll({
            include: [
                {
                    model: models.company
                },
                {
                    model: models.employee
                },
                {
                    model: models.generation_type
                },
                {
                    model: models.opportunity_contact_record
                }
            ]
        }).then(function(opportunities) {
            res.header('Content-Type', 'application/json');
            res.json(opportunities);
        });
    });

    app.get('/api/opportunity/:id', function(req, res) {
        const id = req.params.id;
        models.opportunity.find({
            where: {
                id: id
            },
            include: [
                {
                    model: models.company
                },
                {
                    model: models.employee
                },
                {
                    model: models.generation_type
                },
                {
                    model: models.opportunity_contact_record
                }
            ]
        }).then(function(opportunity) {
            if (opportunity == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No opportunity found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(opportunity);
            }
        })
    });

    app.post('/api/opportunity', function(req, res) {
        models.opportunity.create({
            name: req.body.name,
            description: req.body.description,
            company_id: req.body.company_id,
            currency: req.body.currency,
            expected_close_date: req.body.expected_close_date,
            approximate_worth: req.body.approximate_worth,
            generated_through_id: req.body.generated_through_id,
            probability: req.body.probability,
            next_steps: req.body.next_steps,
            notes: req.body.notes,
            account_manager_id: req.body.account_manager_id
        }).then(function(opportunity) {
            res.header('Content-Type', 'application/json');
            res.json(opportunity);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your opportunity, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/opportunity/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.opportunity.findOne({
            where: {
                id: id
            },
            include: [
                {
                    model: models.company
                },
                {
                    model: models.employee
                },
                {
                    model: models.generation_type
                },
                {
                    model: models.opportunity_contact_record
                }
            ]
        }).then(function(opportunity) {
            if (opportunity == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No opportunity found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_address_id'
                    }
                });
            } else {
                return opportunity.updateAttributes(updates).then(function(opportunity) {
                    res.header('Content-Type', 'application/json');
                    res.json(opportunity);
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
                        'message': 'There was an error when creating your opportunity, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/opportunity/:id', function(req, res) {
        const id = req.params.id;
        models.opportunity.destroy({
            where: {
                id: id
            }
        }).then(function(opportunity) {
            res.header('Content-Type', 'application/json');
            res.json(opportunity);
        });
    });

}
