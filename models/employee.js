"use strict";

module.exports = function(sequelize, DataTypes) {
  var Employee = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    office_phone: DataTypes.STRING,
    cell_phone: DataTypes.STRING,
    title: DataTypes.INTEGER,
    department_id: DataTypes.STRING,
    fax: DataTypes.STRING,
    office_address: DataTypes.STRING,
    email: DataTypes.STRING
  });

  return Employee;
};