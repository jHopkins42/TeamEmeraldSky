// Necessary packages
const inquirer = require("inquirer");
const fs = require("fs");
const generateTeam = require("./src/page-template.js");

// employee role modules
const Engineer = require("./role/engineer");
const Intern = require("./role/Intern");
const Manager = require("./role/manager");

// entering new staff
const newStaffMemberData = [];

// Questions to define employee
const questions = async () => {
  const answers = await inquirer
    .prompt([
      {
        name: "name",
        message: "Who are you?  (first and last names only)",
        type: "input",
      },
      {
        name: "id",
        message: "Employee ID number?",
        type: "input",
      },
      {
        name: "email",
        message: "What is your email?",
        type: "input",
      },
      {
        name: "role",
        message: "What function do you have?",
        type: "checkbox",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
    //  console.log the followup questions for Manager function
      if (answers.role === "Manager") {
        const mgrAns = await inquirer
          .prompt([
            {
              name: "officeNumber",
              message: "What is your office number",
              type: "input",
            },
          ])
          const newMgr = new Manager(
            answers.name,
            answers.id,
            answers.email,
            mgrAns.officeNumber
          );
          newStaffMemberData.push(newMgr);
          
       //follow up questions for engineer role
      } else if (answers.role === "Engineer") {
        const gitHubAns = await inquirer
          .prompt([
            {
              name: "userName",
              message: "What is your GitHub user name?",
              type: "input",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              gitHubAns.userName
            );
            newStaffMemberData.push(newEngineer);
          
       // followup questions for intern role
      } else if (answers.role === "Intern") {
        const internAns = await inquirer
          .prompt([
            {
              name: "school",
              message: "What university did you attend?",
              type: "input",
            },
          ])
          
          const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAns.school
          );
          newStaffMemberData.push(newIntern);          
      } 

};

//Prompts to create a team

async function promptQuestions() {
  await questions()
    
  
  const addMemberAns = await inquirer
    .prompt([
      {
        name:'addMember',
        message: "What would you like to do next?",
        type: 'list',
        choices: ['Add a new member', 'Create team'],
        }
    ])

    if (addMemberAns.addMember === 'Add a new member') {
      return promptQuestions()
    }
    return createTeam();
}  

promptQuestions();

//output function
function createTeam () {
  console.log("new guy", newStaffMemberData)
  fs.writeFileSync(
    "./output/index.html",
    generateTeam(newStaffMemberData),
    "utf-8"
  );
}

// yes we have no bananas today.
