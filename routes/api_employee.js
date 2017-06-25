var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/employees', function(req, res) {
        models.employee.findAll({
            include: [{
                model: models.department
            }]
        }).then(function(employees) {
            res.header('Content-Type', 'application/json');
            res.json(employees);
        });
    });

    app.get('/api/employee/:id', function(req, res) {
        const id = req.params.id;
        models.employee.find({
            where: {
                id: id
            },
            include: [{
                model: models.department
            }]
        }).then(function(employee) {
            if (employee == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No employee found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'employee_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(employee);
            }
        })
    });

    app.post('/api/employee', function(req, res) {
        models.employee.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            office_phone: req.body.office_phone,
            cell_phone: req.body.cell_phone,
            title: req.body.title,
            department_id: req.body.department_id,
            fax: req.body.fax,
            office_address: req.body.office_address,
            email: req.body.email
        }).then(function(employee) {
            res.header('Content-Type', 'application/json');
            res.json(employee);
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

    app.patch('/api/employee/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.employee.findOne({
            where: {
                id: id
            }
        }).then(function(employee) {
            if (employee == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No employee found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'employee_id'
                    }
                });
            } else {
                return employee.updateAttributes(updates).then(function(employee) {
                    res.header('Content-Type', 'application/json');
                    res.json(employee);
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

    app.delete('/api/employee/:id', function(req, res) {
        const id = req.params.id;
        models.employee.destroy({
            where: {
                id: id
            }
        }).then(function(employee) {
            res.header('Content-Type', 'application/json');
            res.json(employee);
        });
    });

}
