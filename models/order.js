"use strict";

module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    customer_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    date: DataTypes.DATE
  });

  order.associate = function(models) {
    order.belongsTo(models.customer);
  }

  return order;
};
