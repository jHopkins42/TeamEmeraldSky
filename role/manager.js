const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, userName) {
        super(name, id, email)
        this.userName = userName;
    }
  
    getRole() {
      return 'Engineer'
      }
  
    getGitHubAns() {
      return this.gitHubAns   
      }
}
  
  module.exports = Engineer;
  