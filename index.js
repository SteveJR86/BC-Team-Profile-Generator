const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// const to hold team as array
const team = [];

// function to call the choices
function makeChoice(){
  const choices = [
    {
      type: "list",
      name: "choice",
      message: "What do you want to do next?",
      choices: ["Add an engineer", "Add an intern", "Finish building the team"],
    }
  ]

  inquirer.prompt(choices)
  .then(choice => {
    if(choice.choice === "Add an engineer") {
      addEngineer();
    } else if (choice.choice === "Add an intern"){
      addIntern();
    } else {
      renderHTML();
    }
  }
  )
}

// function to add an engineer to team
function addEngineer(){
  const questions = [
    {
    type: "input",
    name: "name",
    message: "What is the Engineers name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the Engineers id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the Engineers email?",
    },
    {
      type: "input",
      name: "github",
      message: "What is the Engineers GitHub Username?",
    },
  ]
  inquirer.prompt(questions)
  .then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    team.push(engineer);
    makeChoice();
  })
}
// function to add an intern to team
function addIntern(){
  const questions = [
    {
    type: "input",
    name: "name",
    message: "What is the Interns name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the Interns id?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the Interns email?",
    },
    {
      type: "input",
      name: "school",
      message: "What is the Interns School?",
    },
  ]
  inquirer.prompt(questions)
  .then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    team.push(intern);
    makeChoice();
  })
}
// function to render team to HTML
function renderHTML(){
  const htmlContent = render(team);
  fs.writeFile(outputPath, htmlContent, function(err) {
    if(err) throw err;
    console.log("Saved!");
  });
}
  

// ask manager questions
const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the team managers name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is their Employee ID?",
  },
  {
    type: "input",
    name: "email",
    message: "What is their email address?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is their office number?",
  },
]

inquirer.prompt(managerQuestions)
.then(answers => {
  const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
  team.push(manager);
  makeChoice();
});