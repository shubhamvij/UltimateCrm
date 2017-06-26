var models = require("../models");

module.exports = function(app) {
    app.patch('/api/regression/:id', function(req, res) {
        const id = req.params.id;
        models.customer.findOne({
            where: {
                id: id
            },
            include: [{
                order: models.order
            }]
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
                    est_lifetime_value: customer.est_lifetime_value,
                    stage: customer.stage,
                    next_steps: customer.next_steps
                };
                if (customer.order.length > 1) {
                    const lastTotal = customer.order[customer.order.length - 1].price * customer.order[customer.order.length - 1].quantity;
                    const secondLastTotal = customer.order[customer.order.length - 2].price * customer.order[customer.order.length - 2].quantity;
                    const timeDiff = Math.abs(customer.order[customer.order.length - 1].date - customer.order[customer.order.length - 1].date);
                    const fiveYears = 157784630000;
                    if (lastTotal > secondLastTotal) {
                        const estimatedTotal = fiveYears / timeDiff * (lastTotal - secondLastTotal) * 2.4
                        updates = {
                            est_lifetime_value: estimatedTotal,
                            stage: "replace this",
                            next_steps: "replace this"
                        };
                    } else {
                        const estimatedTotal = fiveYears / timeDiff * (secondLastTotal - lastTotal) * 1.3;
                        updates = {
                            est_lifetime_value: Math.max(estimatedTotal, 0),
                            stage: "replace this",
                            next_steps: "replace this"
                        };
                    }
                }
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