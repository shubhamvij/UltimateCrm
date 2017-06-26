"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer = sequelize.define("customer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    office_phone: DataTypes.STRING,
    other_phone: DataTypes.STRING,
    other_phone_type: DataTypes.STRING,
    title: DataTypes.STRING,
    department: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    account_manager_id: DataTypes.INTEGER,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    office_address: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    generated_through_id: DataTypes.INTEGER,
    est_lifetime_value: DataTypes.INTEGER,
    amt_purchased: DataTypes.INTEGER,
    notes: DataTypes.TEXT('long'),
    customer_type_id: DataTypes.INTEGER
  });

  customer.associate = function(models) {
    customer.belongsTo(models.company);
    customer.belongsTo(models.customer_type);
    customer.belongsTo(models.employee, {
      foreignKey: 'account_manager_id'
    });
    customer.belongsTo(models.generation_type, {
      foreignKey: 'generated_through_id'
    });
    customer.hasMany(models.customer_contact_record);
    customer.hasMany(models.customer_information);
    customer.hasMany(models.customer_review);
    customer.hasMany(models.order);
  }

  return customer;
};
