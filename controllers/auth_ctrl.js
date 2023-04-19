const User = require("../models/user_mdl");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  //   console.log(user.dataValues);

  if (user && (await user.checkPassword(password))) {
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 20 * 3600 * 1000),
      httpOnly: true,
    });

    return res.status(200).json({
      message: "success",
      token: token,
    });
  } else {
    return res.status(403).json({
      error: "Invalid email or password",
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
  if (!!req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        "MY_UNGU3S5AB!E-S#CR3T"
      );

      const user = await User.findOne({
        where: { _userID: decoded._userID },
      });

      if (!user) {
        return next();
      }

      const currentUser = Object.assign(user.dataValues);
      delete currentUser.password;
      delete currentUser.createdAt;
      delete currentUser.updatedAt;

      res.locals.user = req.currentUser = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.authenticate = async (req, res, next) => {
  try {
    const token = jwt.verify(req.cookies.jwt, "MY_UNGU3S5AB!E-S#CR3T");

    const user = await User.findOne({
      where: {
        _userID: token._userID || "45t",
      },
    });

    if (!user) {
      return res.status(209).json({ error: "You are not logged in" });
    }

    const currentUser = Object.assign(user.dataValues);
    delete currentUser.password;
    delete currentUser.createdAt;
    delete currentUser.updatedAt;

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ error: "please login first" });
  }
};

exports.restrictTo = async (req, res) => {};
exports.newPassword = async (req, res) => {};
exports.forgotPassword = async (req, res) => {};
