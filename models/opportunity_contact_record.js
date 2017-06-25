"use strict";

module.exports = function(sequelize, DataTypes) {
  var opportunity_contact_record = sequelize.define("opportunity_contact_record", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    opportunity_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    contact_type_id: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    start_date_time: DataTypes.DATE,
    end_date_time: DataTypes.DATE,
    description: DataTypes.TEXT('long'),
    notes: DataTypes.TEXT('long')
  });

  opportunity_contact_record.associate = function(models) {
    opportunity_contact_record.belongsTo(models.opportunity);
    opportunity_contact_record.belongsTo(models.customer);
    opportunity_contact_record.belongsTo(models.employee);
    opportunity_contact_record.belongsTo(models.contact_type);
  }

  return opportunity_contact_record;
};
