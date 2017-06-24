"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_contact_record = sequelize.define("customer_contact_record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    customer_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    contact_detail_id: DataTypes.INTEGER
  });

  customer_contact_record.associate = function(models) {
    customer_contact_record.belongsTo(models.customer);
    customer_contact_record.belongsTo(models.employee);
    customer_contact_record.belongsTo(models.contact_detail);
  }

  return customer_contact_record;
};
