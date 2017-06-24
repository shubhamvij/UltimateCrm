"use strict";

module.exports = function(sequelize, DataTypes) {
  var department = sequelize.define("department", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  department.associate = function(models) {
    department.hasMany(models.employee);
  }

  return department;
};
