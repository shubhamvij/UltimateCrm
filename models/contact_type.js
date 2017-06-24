"use strict";

module.exports = function(sequelize, DataTypes) {
  var contact_type = sequelize.define("contact_type", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT('long')
  });

  contact_type.associate = function(models) {
    contact_type.hasMany(models.contact_detail);
  }

  return contact_type;
};
