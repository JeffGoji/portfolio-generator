"use strict";
const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template");

// fs.writeFile("./index.html", pageHTML, (err) => {
//   if (err) throw err;

//   console.log("Portfolio Complete! Checkout index.html to see the output!");
// });

//Placing Inqurer into a "promptUser" function:
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your Github Username",
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  console.log(`
  =============================
  Add a New Project
  =============================
  `);

  //If there is no 'projects' array create one:
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your Project Name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Please provide a description of your Project (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please Provide a Description!");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter your Github Link!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to Enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile("./index.html", pageHTML, (err) => {
      if (err) throw new Error(err);
      console.log(
        "Page created! Check out index.html in this directory to see it!"
      );
    });
  });
