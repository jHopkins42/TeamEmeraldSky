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
        type: "input",
        message: "Who are you?  (first and last names only)",
        name: "name",
      },
      {
        type: "input",
        message: "Employee ID number?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email",
      },
      {
        type: "checkbox",
        message: "What function do you have?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"],
      },
    ])


    
    //  console.log(answers);
      // followup questions for Manager function
      if (answers.role === "Manager") {
        const mgrAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your office number",
              name: "officeNumber",
            },
          ])
          const newMgr = new Manager(
            answers.name,
            answers.id,
            answers.email,
            mgrAns.officeNumber
          );
          newStaffMemberData.push(newMgr);
          
        // if engineer selected answer these set of questions
      } else if (answers.role === "Engineer") {
        const gitHubAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "What is your GitHub user name?",
              name: "userName",
            }
          ])
            const newEngineer = new Engineer(
              answers.name,
              answers.id,
              answers.email,
              gitHubAns.userName
            );
            newStaffMemberData.push(newEngineer);
          
        // if intern selected answer these set of questions
      } else if (answers.role === "Intern") {
        const internAns = await inquirer
          .prompt([
            {
              type: "input",
              message: "What university did you attend?",
              name: "school",
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
        type: 'list',
        choices: ['Add a new member', 'Create team'],
        message: "What would you like to do next?"
      }
    ])

    if (addMemberAns.addMember === 'Add a new member') {
      return promptQuestions()
    }
    return createTeam();
}  

promptQuestions();

function createTeam () {
  console.log("new guy", newStaffMemberData)
  fs.writeFileSync(
    "./output/index.html",
    generateTeam(newStaffMemberData),
    "utf-8"
  );
}