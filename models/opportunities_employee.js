"use strict";

module.exports = function(sequelize, DataTypes) {
  var opportunities_employee = sequelize.define("opportunities_employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    opportunity_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER
  });

  opportunities_employee.associate = function(models) {
    opportunities_employee.belongsTo(models.company);
    opportunities_employee.belongsTo(models.employee, {
      foreignKey: 'account_manager_id'
    });
    opportunities_employee.belongsTo(models.generation_type, {
      foreignKey: 'generated_through_id'
    });
    opportunities_employee.belongsTo(models.contact_detail);
  }

  return opportunities_employee;
};
