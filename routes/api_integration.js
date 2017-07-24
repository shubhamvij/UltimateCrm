var models = require('../models');
var express = require('express');

module.exports = function(app) {
    app.get('/api/integration/scm', function(req, res) {
        models.product.sync();
        res.end();
    });

    app.get('/api/integration/hrm', function(req, res) {
        models.employee.sync();
        res.end();
    });


    app.get('/api/fill_my_rectum', function(req, res) {
        models.product.sync();
        models.employee.sync();
        res.end();
    });


}
