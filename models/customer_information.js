"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_information = sequelize.define("customer_information", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    customer_id: DataTypes.INTEGER,
    customer_information_type_id: DataTypes.INTEGER,
    value: DataTypes.TEXT('long'),
  });

  customer_information.associate = function(models) {
    customer_information.belongsTo(models.customer);
    customer_information.belongsTo(models.customer_information_type);
  }

  return customer_information;
};
