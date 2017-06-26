"use strict";

module.exports = function(sequelize, DataTypes) {
  var issue_type = sequelize.define("issue_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  issue_type.associate = function(models) {
    issue_type.hasMany(models.issue);
  }

  return issue_type;
};
