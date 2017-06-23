"use strict";

module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define("department", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  return Department;
};