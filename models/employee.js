"use strict";

module.exports = function(sequelize, DataTypes) {
  var employee = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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

  employee.associate = function(models) {
    employee.belongsTo(models.department);
    employee.hasMany(models.customer_contact_record);
    employee.hasMany(models.customer, { foreignKey: 'account_manager_id' })
    employee.hasMany(models.opportunity, { foreignKey: 'account_manager_id' })
    employee.hasMany(models.opportunities_employee, { foreignKey: 'account_manager_id' })
    employee.hasMany(models.order, { foreignKey: 'account_manager_id' })
    employee.hasMany(models.issue, { as: 'opened_by', foreignKey: 'opened_by_id' });
    employee.hasMany(models.issue, { as: 'closed_by', foreignKey: 'closed_by_id' });
    employee.hasMany(models.issue, { as: 'assigned_to', foreignKey: 'assigned_to_id' });
  }

  return employee;
};
