"use strict";
var rp = require('request-promise')

module.exports = function(sequelize, DataTypes) {
  var scm_base = 'https://cs490-scm.herokuapp.com/api';
  var product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    sku: DataTypes.INTEGER,
    trim: DataTypes.STRING,
    color: DataTypes.STRING,
    inventory: DataTypes.INTEGER
  });

  product.sync_product = function(product_obj) {
    var applicable_attributes = {
      sku: product_obj.sku,
      trim: product_obj.trim,
      color: product_obj.color,
      name: product_obj.name,
      inventory: product_obj.inventory
    }
    product.findOne({
      where: {
        sku: product_obj.sku
      }
    }).then(function(current_model) {
      if (current_model) {
        current_model.update(applicable_attributes);
      } else {
        product.create(applicable_attributes);
      }
    })
  }

  product.sync = function() {
    rp({
        url: scm_base + '/inventory',
        method: 'GET',
        json: true
      })
      .then(function(response) {
        for (var i = 0; i < response.length; i++) {
          product.sync_product(response[i]);
        }
      });
  }

  product.associate = function(models) {
    product.hasMany(models.order_line_item);
    product.hasMany(models.customer_review);
  }

  return product;
};