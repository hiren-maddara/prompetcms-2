const path = require("path");
// const creditController = require("./credit_ctrl");
const Credit = require("../models/credits_mdl");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function appendZero(str) {
  if (Number(str) < 10) {
    return `0${str}`;
  } else {
    return str;
  }
}
function parseDate(dateToParse) {
  const date = new Date(dateToParse);
  const parsedDate = `${
    months[date.getMonth()]
  } ${date.getDate()} - ${appendZero(date.getHours())}:${appendZero(
    date.getMinutes()
  )}`;
  return parsedDate;
}

exports.getIndex = async (req, res) => {
  res.status(200).render("templates/credit-form", {
    title: "index",
    user: req.currentUser,
  });
};

exports.getCreditForm = async (req, res) => {
  res.status(200).render("templates/credit-form", {
    title: "credit form",
    user: req.currentUser,
  });
};

exports.getCreditReport = async (req, res) => {
  const credit = await Credit.findOne({
    where: { _id: req.params.id },
  });

  if (credit) {
    const creditData = credit.dataValues;
    creditData.date = parseDate(creditData.createdAt);
    res.status(200).render("templates/credit-report", {
      title: "report",
      user: req.currentUser,
      credit: creditData,
    });
  } else {
    res.status(209).render("templates/credit-report", {
      error: "no such credit",
    });
  }
};

exports.getCreditTable = async (req, res) => {
  if (req.currentUser) {
    let credits = (await Credit.findAll()).map((credit) => credit.dataValues);
    credits = credits.map((credit) => {
      credit.date = parseDate(credit.createdAt);
      return credit;
    });

    res.status(200).render("templates/credit-table", {
      title: "credits",
      credits,
      user: req.currentUser,
    });
  } else {
    res.status(403).render("templates/credit-table", {
      title: "credits",
      credits: [],
      user: null,
    });
  }
};

exports.getLoginPage = async (req, res) => {
  res.status(200).render("login");
};

exports.getSignUpPage = async (req, res) => {
  res.status(200).render("signup");
};

exports.getDBManagePage = async (req, res) => {};

exports.getAdminPage = async (req, res) => {};

exports.base = async (req, res) => {
  res.status(200).render("base");
};
