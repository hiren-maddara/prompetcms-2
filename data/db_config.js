const { Sequelize } = require("sequelize");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "/prompet.db"),
});

sequelize
  .authenticate({ logging: false })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("ERR-CON:", err));

module.exports = sequelize;
