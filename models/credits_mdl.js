const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/db_config");

class Credit extends Model {}
Credit.init(
  {
    _id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    driver: {
      type: DataTypes.STRING,
    },
    plateNumber: {
      type: DataTypes.STRING,
    },
    employee: {
      type: DataTypes.STRING,
    },
    shift: {
      type: DataTypes.STRING,
    },
    creditAmount: {
      type: DataTypes.FLOAT,
    },
    collectedAmount: {
      type: DataTypes.FLOAT,
    },
    runningBalance: {
      type: DataTypes.FLOAT,
    },
    paymentStatus: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Credit",
    timestamps: true,
  }
);

module.exports = Credit;
