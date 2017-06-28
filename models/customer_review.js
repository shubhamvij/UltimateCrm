"use strict";

module.exports = function(sequelize, DataTypes) {
  var customer_review = sequelize.define("customer_review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    source: DataTypes.STRING,
    subject: DataTypes.STRING,
    body: DataTypes.TEXT,
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  });

  customer_review.associate = function(models) {
    customer_review.belongsTo(models.customer);
    customer_review.belongsTo(models.product);
  }

  return customer_review;
};
