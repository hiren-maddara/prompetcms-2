const User = require("../models/user_mdl");

User.sync();

exports.addUser = async (req, res) => {
  const { userName, email, profileImg, password, confirmPassword, role } =
    req.body;
  if (password !== confirmPassword)
    return res.status(402).json({ error: "passwords donot match" });

  await User.create({ userName, profileImg, email, role, password });
  res.status(200).json({
    message: "user added",
  });
};
