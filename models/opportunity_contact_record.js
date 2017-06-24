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
    contact_detail_id: DataTypes.INTEGER    
  });

  return opportunity_contact_record;
};
