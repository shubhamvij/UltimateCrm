"use strict";

module.exports = function(sequelize, DataTypes) {
  var order_line_item = sequelize.define("order_line_item", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL(15, 2),
    order_id: DataTypes.INTEGER
  });

  order_line_item.associate = function(models) {
    order_line_item.belongsTo(models.order);
    order_line_item.belongsTo(models.product);
  }

  return order_line_item;
};
