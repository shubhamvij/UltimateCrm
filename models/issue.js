"use strict";

module.exports = function(sequelize, DataTypes) {
  var issue = sequelize.define("issue", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    customer_id: DataTypes.INTEGER,
    opened_by_id: DataTypes.INTEGER,
    closed_by_id: DataTypes.INTEGER,
    assigned_to_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    closed_at: DataTypes.DATE,
    title: DataTypes.STRING,
    priority: DataTypes.INTEGER,
    issue_type_id: DataTypes.INTEGER,
    issue_notes: DataTypes.TEXT('long')
  });

  issue.associate = function(models) {
    issue.belongsTo(models.employee, {
      as: 'opened_by',
      foreignKey: 'opened_by_id'
    });
    issue.belongsTo(models.employee, {
      as: 'closed_by',
      foreignKey: 'closed_by_id'
    });
    issue.belongsTo(models.employee, {
      as: 'assigned_to',
      foreignKey: 'assigned_to_id'
    });
    issue.belongsTo(models.issue_type);
    issue.belongsTo(models.customer);
  }

  return issue;
};
