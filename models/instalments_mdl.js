const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/db_config");

class Instalment extends Model {}
Instalment.init(
  {
    date: {
      type: DataTypes.DATE,
    },
    reference: {
      type: DataTypes.STRING,
    },
    driver: {
      type: DataTypes.STRING,
    },
    shift: {
      type: DataTypes.STRING,
    },
    plateNumber: {
      type: DataTypes.STRING,
    },
    employee: {
      type: DataTypes.STRING,
    },
    outstandingBalance: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "Instalment",
    timestamps: false,
  }
);

module.exports = Instalment;
