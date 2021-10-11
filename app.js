"use strict";
const profileDataArgs = process.argv.slice(2, process.argv.length);

const [name, github] = profileDataArgs;

const fs = require("fs");

const generatePage = require("./src/page-template");

fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;

  console.log("Portfolio Complete! Checkout index.html to see the output!");
});
