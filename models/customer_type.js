"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_type = sequelize.define("customer_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  customer_type.associate = function(models) {
    customer_type.hasMany(models.customer);
  }

  return customer_type;
};
