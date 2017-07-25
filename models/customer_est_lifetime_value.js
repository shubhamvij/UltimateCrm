"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_est_lifetime_value = sequelize.define("customer_est_lifetime_value", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    value: DataTypes.INTEGER
  });

  customer_est_lifetime_value.associate = function(models) {
    customer_est_lifetime_value.belongsTo(models.customer);
  }

  return customer_est_lifetime_value;
};
