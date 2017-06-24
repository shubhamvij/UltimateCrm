"use strict";

module.exports = function(sequelize, DataTypes) {
  var company_prediction = sequelize.define("company_prediction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    value: DataTypes.DECIMAL(15, 2),
    date_predicted: DataTypes.DATE,
    company_id: DataTypes.STRING
  });

  company_prediction.associate = function(models) {
    company_prediction.belongsTo(models.company);
  }

  return company_prediction;
};
