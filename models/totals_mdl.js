const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/db_config");

class Total extends Model {}
Total.init(
  {
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    collectedAmount: {
      type: DataTypes.FLOAT,
    },
    debtsAmount: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Total",
    timestamps: false,
  }
);

module.exports = Total;
