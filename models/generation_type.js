"use strict";

module.exports = function(sequelize, DataTypes) {
  var generation_type = sequelize.define("generation_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  generation_type.associate = function(models) {
    generation_type.hasMany(models.customer, { foreignKey: 'generated_through_id' })
    generation_type.hasMany(models.opportunity, { foreignKey: 'generated_through_id' })
  }

  return generation_type;
};
