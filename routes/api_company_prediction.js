var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/company_predictions', function(req, res) {
        models.company_prediction.findAll({
            include: [{
                model: models.company
            }]
        }).then(function(company_predictions) {
            res.header('Content-Type', 'application/json');
            res.json(company_predictions);
        });
    });

    app.get('/api/company_prediction/:id', function(req, res) {
        const id = req.params.id;
        models.company_prediction.find({
            where: {
                id: id
            },
            include: [{
                model: models.company
            }]
        }).then(function(company_prediction) {
            if (company_prediction == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company_prediction found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'company_prediction_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(company_prediction);
            }
        })
    });

    app.post('/api/company_prediction', function(req, res) {
        models.company_prediction.create({
            name: req.body.name,
            value: req.body.value,
            date_predicted: req.body.date_predicted,
            company_id: req.body.company_id
        }).then(function(company_prediction) {
            res.header('Content-Type', 'application/json');
            res.json(company_prediction);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your company_prediction, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/company_prediction/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.company_prediction.findOne({
            where: {
                id: id
            },
            include: [{
                model: models.company
            }]
        }).then(function(company_prediction) {
            if (company_prediction == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No company_prediction found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'department_id'
                    }
                });
            } else {
                return company_prediction.updateAttributes(updates).then(function(company_prediction) {
                    res.header('Content-Type', 'application/json');
                    res.json(company_prediction);
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
                        'message': 'There was an error when creating your company prediction, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/company_prediction/:id', function(req, res) {
        const id = req.params.id;
        models.company_prediction.destroy({
            where: {
                id: id
            }
        }).then(function(company_prediction) {
            res.header('Content-Type', 'application/json');
            res.json(company_prediction);
        });
    });

}
