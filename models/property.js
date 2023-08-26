"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  property.init(
    {
      property_type: DataTypes.ENUM,
      location: DataTypes.STRING,
      approximate_price: DataTypes.INTEGER,
      property_images: DataTypes.BLOB,
      contact_details: DataTypes.STRING,
      available_hours: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "property",
    }
  );
  return property;
};
