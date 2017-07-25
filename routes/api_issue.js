var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/issues', function(req, res) {
        models.issue.findAll({
            include: [{
                    model: models.employee,
                    as: 'opened_by'
                },
                {
                    model: models.employee,
                    as: 'closed_by'
                },
                {
                    model: models.employee,
                    as: 'assigned_to'
                },
                {
                    model: models.issue_type
                },
                {
                    model: models.customer
                }
            ]
        }).then(function(issue) {
            res.header('Content-Type', 'application/json');
            res.json(issue);
        });
    });

    app.get('/api/issue/:id', function(req, res) {
        const id = req.params.id;
        models.issue.find({
            where: {
                id: id
            },
            include: [{
                    model: models.employee,
                    as: 'opened_by'
                },
                {
                    model: models.employee,
                    as: 'closed_by'
                },
                {
                    model: models.employee,
                    as: 'assigned_to'
                },
                {
                    model: models.issue_type
                },
                {
                    model: models.customer
                }
            ]
        }).then(function(issue) {
            if (issue == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No issue found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'issue_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(issue);
            }
        })
    });

    app.post('/api/issue', function(req, res) {
        models.issue.create({
            customer_id: req.body.customer_id,
            opened_by_id: req.body.opened_by_id,
            closed_by_id: req.body.closed_by_id,
            assigned_to_id: req.body.assigned_to_id,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            title: req.body.title,
            priority: req.body.priority,
            issue_type_id: req.body.issue_type_id,
            issue_notes: req.body.issue_notes,
            closed_at: req.body.closed_at
        }).then(function(issue) {
            res.header('Content-Type', 'application/json');
            res.json(issue);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your issue, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/issue/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.issue.findOne({
            where: {
                id: id
            },
            include: [{
                    model: models.employee,
                    as: 'opened_by'
                },
                {
                    model: models.employee,
                    as: 'closed_by'
                },
                {
                    model: models.employee,
                    as: 'assigned_to'
                },
                {
                    model: models.issue_type
                },
                {
                    model: models.customer
                }
            ]
        }).then(function(issue) {
            if (issue == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No issue found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'issue_id'
                    }
                });
            } else {
                return issue.updateAttributes(updates).then(function(issue) {
                    res.header('Content-Type', 'application/json');
                    res.json(issue);
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
                        'message': 'There was an error when creating your issue, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/issue/:id', function(req, res) {
        const id = req.params.id;
        models.issue.destroy({
            where: {
                id: id
            }
        }).then(function(issue) {
            res.header('Content-Type', 'application/json');
            res.json(issue);
        });
    });

}