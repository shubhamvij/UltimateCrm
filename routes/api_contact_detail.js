var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/contact_detail', function(req, res) {
        models.contact_detail.findAll().then(function(contact_detail) {
            res.header('Content-Type', 'application/json');
            res.json(contact_detail);
        });
    });

    app.get('/api/contact_detail/:id', function(req, res) {
        const id = req.params.id;
        models.contact_detail.find({
            where: {
                id: id
            }
        }).then(function(contact_detail) {
            if (contact_detail == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No contact_detail found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_detail_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(contact_detail);
            }
        })
    });

    app.post('/api/contact_detail', function(req, res) {
        models.contact_detail.create({
            contact_type_id: req.body.contact_type_id,
            subject: req.body.subject,
            start_date_time: req.body.start_date_time,
            end_date_time: req.body.end_date_time,
            description: req.body.description,
            notes: req.body.notes
        }).then(function(contact_detail) {
            res.header('Content-Type', 'application/json');
            res.json(contact_detail);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your contact_detail, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/contact_detail/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.contact_detail.findOne({
            where: {
                id: id
            }
        }).then(function(contact_detail) {
            if (contact_detail == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No contact_detail found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'contact_detail_id'
                    }
                });
            } else {
                return contact_detail.updateAttributes(updates).then(function(contact_detail) {
                    res.header('Content-Type', 'application/json');
                    res.json(contact_detail);
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

    app.delete('/api/contact_detail/:id', function(req, res) {
        const id = req.params.id;
        models.contact_detail.destroy({
            where: {
                id: id
            }
        }).then(function(contact_detail) {
            res.header('Content-Type', 'application/json');
            res.json(contact_detail);
        });
    });

}
