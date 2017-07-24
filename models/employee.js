"use strict";
var rp = require('request-promise')

module.exports = function(sequelize, DataTypes) {
  var hummus_base = 'https://hummus-api.herokuapp.com/api';
  var hrm_api_token = '';
  var employee = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    office_phone: DataTypes.STRING,
    cell_phone: DataTypes.STRING,
    title: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
    fax: DataTypes.STRING,
    office_address: DataTypes.STRING,
    email: DataTypes.STRING
  });

  employee.sync_employee = function(id) {
    rp({
        url: hummus_base + '/Employee/' + id,
        method: 'GET',
        headers: {
          'X-Access-Token': hrm_api_token
        },
        json: true
      })
      .then(function(response) {
        var employee_obj = response[0];
        var applicable_attributes = {
          id: employee_obj.employeeId,
          username: employee_obj.username,
          first_name: employee_obj.firstName,
          last_name: employee_obj.lastName,
          office_phone: employee_obj.phone,
          title: employee_obj.jobTitle,
          department_id: 3,
          office_address: employee_obj.address,
          email: employee_obj.email
        }
        employee.findOne({
          where: {
            id: employee_obj.employeeId
          }
        }).then(function(current_model) {
          if (current_model) {
            current_model.update(applicable_attributes);
          } else {
            employee.create(applicable_attributes);
          }

        });
      });
  }

  employee.sync = function() {
    rp({
        url: hummus_base + '/sign-in',
        method: 'POST',
        form: {
          username: 'api',
          password: 'api'
        },
        json: true
      })
      .then(function(response) {
        hrm_api_token = response["token"];
        return rp({
          url: hummus_base + '/Department/3',
          method: 'GET',
          headers: {
            'X-Access-Token': hrm_api_token
          },
          json: true
        });
      })
      .then(function(response) {
        for (var i = 0; i < response.length; i++) {
          employee.sync_employee(response[i]);
        }
      });
  };

  employee.associate = function(models) {
    employee.belongsTo(models.department);
    employee.hasMany(models.customer_contact_record);
    employee.hasMany(models.customer, {
      foreignKey: 'account_manager_id'
    })
    employee.hasMany(models.opportunity, {
      foreignKey: 'account_manager_id'
    })
    employee.hasMany(models.opportunities_employee, {
      foreignKey: 'account_manager_id'
    })
    employee.hasMany(models.order, {
      foreignKey: 'account_manager_id'
    })
    employee.hasMany(models.issue, {
      as: 'opened_by',
      foreignKey: 'opened_by_id'
    });
    employee.hasMany(models.issue, {
      as: 'closed_by',
      foreignKey: 'closed_by_id'
    });
    employee.hasMany(models.issue, {
      as: 'assigned_to',
      foreignKey: 'assigned_to_id'
    });
  };

  return employee;
};