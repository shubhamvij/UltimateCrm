"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_information_type = sequelize.define("customer_information_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  customer_information_type.associate = function(models) {
    customer_information_type.hasMany(models.customer_information);
  }

  return customer_information_type;
};
