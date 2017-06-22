"use strict";

module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define("department", {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  Department.associate = function(models) {
    Department.hasMany(models.Employee);
  }
  
  return Department;
};