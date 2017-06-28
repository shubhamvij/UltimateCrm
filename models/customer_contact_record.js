"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_contact_record = sequelize.define("customer_contact_record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    contact_type_id: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    description: DataTypes.TEXT('long'),
    notes: DataTypes.TEXT('long')
  });

  customer_contact_record.associate = function(models) {
    customer_contact_record.belongsTo(models.customer);
    customer_contact_record.belongsTo(models.employee);
    customer_contact_record.belongsTo(models.contact_type);
  }

  return customer_contact_record;
};
