"use strict";

module.exports = function(sequelize, DataTypes) {
  var distributor = sequelize.define("distributor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    distribution_channel: DataTypes.STRING,
    reputation: DataTypes.INTEGER,
    description: DataTypes.TEXT('long')
  });

  return distributor;
};
