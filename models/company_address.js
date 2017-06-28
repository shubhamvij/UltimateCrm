"use strict";

module.exports = function(sequelize, DataTypes) {
  var company_address = sequelize.define("company_address", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    address_line_one: DataTypes.STRING,
    address_line_two: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    country: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    address_type: DataTypes.STRING
  });

  company_address.associate = function(models) {
    company_address.belongsTo(models.company);
  }

  return company_address;
};
