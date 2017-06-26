"use strict";

module.exports = function(sequelize, DataTypes) {
  var opportunities_employee = sequelize.define("opportunities_employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    opportunity_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    account_manager_id: DataTypes.INTEGER
  });

  opportunities_employee.associate = function(models) {
    opportunities_employee.belongsTo(models.customer);
    opportunities_employee.belongsTo(models.opportunity);
    opportunities_employee.belongsTo(models.employee, { foreignKey: 'account_manager_id' })
  }

  return opportunities_employee;
};
