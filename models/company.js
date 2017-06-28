"use strict";

module.exports = function(sequelize, DataTypes) {
  var company = sequelize.define("company", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    country: DataTypes.STRING,
    account_manager_id: DataTypes.INTEGER
  });

  company.associate = function(models) {
    company.belongsTo(models.employee, {
      onDelete: "CASCADE",
      foreignKey: 'account_manager_id'
    });
    company.hasMany(models.company_address);
    company.hasMany(models.company_prediction);
    company.hasMany(models.customer);
    company.hasMany(models.opportunity);
  }

  return company;
};
