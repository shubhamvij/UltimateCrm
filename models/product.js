"use strict";

module.exports = function(sequelize, DataTypes) {
  var product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sku: DataTypes.INTEGER,
    trim: DataTypes.STRING,
    color: DataTypes.STRING,
    inventory: DataTypes.INTEGER
  });

  product.associate = function(models) {
    product.hasMany(models.order_line_item);
    product.hasMany(models.customer_review);
  }

  return product;
};
