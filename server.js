const express = require("express");

const app = require("./app");

const port = 49310;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
