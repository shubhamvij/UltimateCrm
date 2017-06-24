"use strict";

module.exports = function(sequelize, DataTypes) {
  var contact_detail = sequelize.define("contact_detail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    contact_type_id: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    description: DataTypes.TEXT('long'),
    notes: DataTypes.TEXT('long')
  });

  contact_detail.associate = function(models) {
    contact_detail.belongsTo(models.contact_type);
    contact_detail.hasMany(models.customer_contact_record);
    contact_detail.hasMany(models.opportunities_employee);
  }

  return contact_detail;
};
