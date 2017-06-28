"use strict";

module.exports = function(sequelize, DataTypes) {
  var order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    customer_id: DataTypes.INTEGER,
    account_manager_id: DataTypes.INTEGER,
    total: DataTypes.DECIMAL(15, 2),
    date: DataTypes.DATE
  });

  order.associate = function(models) {
    order.belongsTo(models.customer);
    order.belongsTo(models.employee, { foreignKey: 'account_manager_id' });
    order.hasMany(models.order_line_item);
  }

  return order;
};
