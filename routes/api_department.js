var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/departments', function(req, res) {
        models.department.findAll().then(function(departments) {
            res.header('Content-Type', 'application/json');
            res.json(departments);
        });
    });

    app.get('/api/department/:id', function(req, res) {
        const id = req.params.id;
        models.department.find({
            where: {
                id: id
            }
        }).then(function(department) {
            if (department == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No department found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'department_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(department);
            }
        })
    });

    app.post('/api/department', function(req, res) {
        models.department.create({
            name: req.body.name,
            description: req.body.description
        }).then(function(department) {
            res.header('Content-Type', 'application/json');
            res.json(department);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your department, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/department/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.department.findOne({
            where: {
                id: id
            }
        }).then(function(department) {
            if (department == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No department found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'department_id'
                    }
                });
            } else {
                return department.updateAttributes(updates).then(function(department) {
                    res.header('Content-Type', 'application/json');
                    res.json(department);
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
                        'message': 'There was an error when creating your department, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/department/:id', function(req, res) {
        const id = req.params.id;
        models.department.destroy({
            where: {
                id: id
            }
        }).then(function(department) {
            res.header('Content-Type', 'application/json');
            res.json(department);
        });
    });

}
