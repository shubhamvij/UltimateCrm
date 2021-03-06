"use strict";

module.exports = function(sequelize, DataTypes) {
  var contact_type = sequelize.define("contact_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  contact_type.associate = function(models) {
    contact_type.hasMany(models.opportunity_contact_record);
    contact_type.hasMany(models.customer_contact_record);
  }

  return contact_type;
};
