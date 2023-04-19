const { Model, DataTypes } = require("sequelize");
const sequelize = require("../data/db_config");
const jwt = require("jsonwebtoken");

class User extends Model {
  async checkPassword(candidate) {
    return candidate === this.password;
  }

  async generateAuthToken() {
    try {
      // console.log(this._id);
      const newToken = jwt.sign(
        { _userID: this._userID },
        process.env.JWT_SECRET,
        {
          expiresIn: Number(process.env.JWT_TOKEN_EXPIRY) * 60 * 60 * 1000,
        }
      );
      this.token = newToken;
      await this.save();
      return newToken;
    } catch (err) {
      console.log(err);
    }
  }
}
User.init(
  {
    _userID: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV1,
    },
    userName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    profileImg: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
