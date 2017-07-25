var models = require('../models');
var express = require('express');

// findAll({ include: [{ all: true }]}) can be used instead of that whole loading array, but the array is used because we want to associations of associations

var include_array = [{
        model: models.company
    },
    {
        model: models.customer_type
    },
    {
        model: models.employee
    },
    {
        model: models.generation_type
    },
    {
        model: models.customer_contact_record,
        include: [{
                model: models.employee
            },
            {
                model: models.contact_type
            }
        ]
    },
    {
        model: models.customer_information,
        include: [{
            model: models.customer_information_type
        }]
    },
    {
        model: models.customer_review,
        include: [{
            model: models.product
        }]
    },
    {
        model: models.order,
        include: [{
                model: models.employee
            },
            {
                model: models.order_line_item,
                include: [{
                    model: models.product
                }]
            }
        ]
    },
    {
        model: models.issue,
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
            }
        ]
    },
    {
        model: models.opportunity,
        include: [{
                model: models.company
            },
            {
                model: models.generation_type
            },
            {
                model: models.employee
            }
        ]
    },
    {
        model: models.customer_est_lifetime_value
    }
];

module.exports = function(app) {
    app.get('/api/customers', function(req, res) {
        models.customer.findAll({
            include: include_array
        }).then(function(customers) {
            res.header('Content-Type', 'application/json');
            res.json(customers);
        });
    });

    app.get('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        models.customer.find({
            where: {
                id: id
            },
            include: include_array
        }).then(function(customer) {
            if (customer == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_id'
                    }
                });
            } else {
                res.header('Content-Type', 'application/json');
                res.json(customer);
            }
        })
    });

    app.post('/api/customer', function(req, res) {
        models.customer.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            office_phone: req.body.office_phone,
            other_phone: req.body.other_phone,
            other_phone_type: req.body.other_phone_type,
            title: req.body.title,
            department: req.body.department,
            company_id: req.body.company_id,
            account_manager_id: req.body.account_manager_id,
            fax: req.body.fax,
            email: req.body.email,
            office_address: req.body.office_address,
            description: req.body.description,
            generated_through_id: req.body.generated_through_id,
            est_lifetime_value: req.body.est_lifetime_value,
            amt_purchased: req.body.amt_purchased,
            notes: req.body.notes,
            customer_type_id: req.body.customer_type_id,
            profile_pic: req.body.profile_pic
        }).then(function(customer) {
            res.header('Content-Type', 'application/json');
            res.json(customer);
        }).catch(function(error) {
            console.log(error);
            if (error.hasOwnProperty('errors')) {
                res.status(500).json({
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    errors: {
                        'message': 'There was an error when creating your customer, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.patch('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        const updates = req.body.updates;
        models.customer.findOne({
            where: {
                id: id
            }
        }).then(function(customer) {
            if (customer == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_id'
                    }
                });
            } else {
                return customer.updateAttributes(updates).then(function(customer) {
                    res.header('Content-Type', 'application/json');
                    res.json(customer);
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
                        'message': 'There was an error when creating your customer, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

    app.delete('/api/customer/:id', function(req, res) {
        const id = req.params.id;
        models.customer.destroy({
            where: {
                id: id
            }
        }).then(function(customer) {
            res.header('Content-Type', 'application/json');
            res.json(customer);
        });
    });

    app.get('/api/customer/dnn/:id', function(req, res) {
        const id = req.params.id;
        models.customer.findOne({
            where: {
                id: id
            },
            include: include_array
        }).then(function(customer) {
            if (customer == null) {
                res.status(400).json({
                    errors: {
                        'message': 'No customer found with ID provided.',
                        'type': 'incorrect_parameters',
                        'path': 'incorrect_parameters',
                        'value': 'customer_id'
                    }
                });
            } else {
                var updates = {
                    dnn_notes: customer.dnn_notes,
                    next_steps: customer.next_steps,
                    stage: ""
                };
                if (customer.orders.length > 1) {
                    const lastTotal = parseFloat(customer.orders[customer.orders.length - 1].total);
                    const secondLastTotal = parseFloat(customer.orders[customer.orders.length - 2].total);
                    const timeDiff = parseInt(Math.abs(customer.orders[customer.orders.length - 1].date - customer.orders[customer.orders.length - 2].date)) + 31556952000 * 4;
                    const fiveYears = 157784630000;
                    var estimatedTotal = 0;
                    if (customer.customer_est_lifetime_values.length > 0) {
                        estimatedTotal = customer.customer_est_lifetime_values[customer.customer_est_lifetime_values.length -1].value;
                    }
                    if (lastTotal > secondLastTotal) {
                        estimatedTotal += fiveYears / timeDiff * (lastTotal - secondLastTotal) * 1.7;
                        models.customer_est_lifetime_value.create({
                            customer_id: customer.id,
                            date: new Date().toISOString(),
                            value: estimatedTotal
                        });
                        updates.dnn_notes = "Purchase totals going up.";
                        updates.next_steps = "Meet customer demands by being readily available to help and reaching out on a weekly basis.";
                        updates.stage = "Maintenance";
                    } else {
                        var newEstVal = Math.max(estimatedTotal - fiveYears / timeDiff * (secondLastTotal - lastTotal) * 1.3, 0);
                        models.customer_est_lifetime_value.create({
                            customer_id: customer.id,
                            date: new Date().toISOString(),
                            value: newEstVal
                        });
                        if (newEstVal > 0) {
                            updates.dnn_notes = "Purchase totals going down.";
                            updates.next_steps = "Determine the cause of decreased totals. Reach out regularly to ensure customer satisfaction.";
                            updates.stage = "Recovery";
                        } else {
                            updates.dnn_notes = "Customer value will soon be 0 or negative.";
                            updates.next_steps = "Cease sales and marketing efforts on the customer.";
                            updates.stage = "Termination";
                        }
                    }
                } else {
                    updates.dnn_notes = "Not enough orders to predict accurately.";
                    updates.next_steps = "Call customer to set up more orders.";
                    updates.stage = "Acquisition";
                }
                return customer.updateAttributes(updates).then(function(customer) {
                    res.header('Content-Type', 'application/json');
                    //res.json(customer);
                    res.json(updates);
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
                        'message': 'There was an error when running regression, please try again.',
                        'type': 'unhandled_error',
                        'path': 'unhandled_error',
                        'value': ''
                    }
                });
            }
        });
    });

}