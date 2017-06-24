"use strict";

module.exports = function(sequelize, DataTypes) {
  var opportunity = sequelize.define("opportunity", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long'),
    company_id: DataTypes.INTEGER,
    currency: DataTypes.STRING(5),
    expected_close_date: DataTypes.DATEONLY,
    approximate_worth: DataTypes.DECIMAL(15, 2),
    opportunitiescol: DataTypes.STRING,
    generated_through_id: DataTypes.INTEGER,
    probability: DataTypes.DECIMAL(5, 2),
    next_steps: DataTypes.TEXT('long'),
    notes: DataTypes.TEXT('long'),
    account_manager_id: DataTypes.INTEGER
  });

  opportunity.associate = function(models) {
    opportunity.belongsTo(models.company);
    opportunity.belongsTo(models.employee, {
      foreignKey: 'account_manager_id'
    });
    opportunity.belongsTo(models.generation_type, {
      foreignKey: 'generated_through'
    });
  }

  return opportunity;
};
