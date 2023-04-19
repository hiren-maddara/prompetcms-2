const Credit = require("../models/credits_mdl");

Credit.sync();

exports.createCredit = async (req, res) => {
  try {
    const {
      driver,
      plateNumber,
      employee,
      shift,
      creditAmount,
      collectedAmount,
    } = req.body;

    let runningBalance = Number(creditAmount) - Number(collectedAmount);
    runningBalance = runningBalance > 0 ? runningBalance : 0;

    const newCredit = await Credit.create({
      driver,
      plateNumber,
      employee,
      shift,
      creditAmount,
      runningBalance,
      collectedAmount,
    });

    res.status(200).json({
      message: "success",
      newCredit,
    });
  } catch (err) {
    console.log(err);
    res.status(209).json({ error: err });
  }
};

exports.getCredits = async (req, res) => {
  const credits = await Credit.findAll();

  const creditsData = credits.map((credit) => credit.dataValues);
  // console.log(creditsData);
  // return creditsData;
  res.status(200).json({
    message: "success",
    creditsData,
  });
};

exports.getCredit = async (req, res) => {
  const credit = await Credit.findOne({
    where: { _id: req.params.id },
  });

  if (credit) {
    return res.status(200).json({
      message: "success",
      data: credit,
    });
  } else {
    return res.status(400).json({
      error: "no such credit",
    });
  }
};

exports.updateCredit = async (req, res) => {};

exports.deleteCredit = async (req, res) => {};
