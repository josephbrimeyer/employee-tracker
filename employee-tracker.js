let mysql = require("mysql");
require("dotenv").config();
let inquirer = require("inquirer");
let consoleTable = require("console.table");

let roleArrray = [];
let employeeArray = [];

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Choose one of the following actions:",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager",
        "Add an Employee",
        "Remove an Employee",
        "Update an Employee",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "View all roles",
        "Add a role",
        "Remove a role",
        "Add a department"
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Employees":
          viewAllEmployees();
          break;

        case "View all Employees by Department":
          viewAllEmployeesByDepartment();
          break;

        case "View all Employees by Manager":
          viewAllEmployeesbyManager();
          break;

        case "Add an Employee":
          addEmployee();
          break;

        case "Remove an Employee":
          removeEmployee();
          break;

        case "Update an Employee":
          updateEmployee();
          break;

        case "Update an Employee's Role":
          updateEmployeeRole();
          break;

        case "Update an Employee's Manager":
          updateEmployeeManager();
          break;

        case "View all roles":
          viewAllRoles();
          break;

        case "Add a role":
          addRole();
          break;

        case "Remove a role":
          removeRole();
          break;

        case "Add a department":
          addDepartment();
          break;
      };
    });
  };


  
function viewAllEmployees() {
  console.log("Selecting all employees....\n");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    //log results from the SELECT statement
    console.log(res.length + " employees found.");
    console.table(res);
    runSearch();
  });
}

function viewAllEmployeesByDepartment() {}

function viewAllEmployeesByDepartment() {}

function viewAllEmployeesbyManager() {}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let roleList = res[i].title;
      console.log(roleList);
      roleArrray.push(roleList);
    }
  
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the Employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Employee's last name?",
      },
      {
        type: "rawlist",
        name: "role_id",
        message: "What is the Employee's role?",
        choices: roleArrray
      }, {
        name: "manager_id",
        type: "input",
        message: "What is the employee's manager's name?"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("You're employee was successfully added");
          runSearch();
        });
    })
    
  },


  function removeEmployee() {
    connection.query(
      "SELECT * FROM employee",
      function (err, res) {
          if (err) throw err;
          console.table(res);
          let roleArray = [];
          roleArray.push(res[0].title);
          inquirer
              .prompt([{
                  name: "first_name",
                  type: "input",
                  message: "What is the employee's first name?"
              }, {
                  name: "last_name",
                  type: "input",
                  message: "What is the employee's last name?"
              }, {
                  name: "role_id",
                  type: "rawlist",
                  message: "What is the employee's role?",
                  choices: roleArray
              }]).then(function (answer) {
                  console.log(answer);
                  connection.query(
                      "DELETE FROM employee SET role_id WHERE ?", {
                          first_name: answer.first_name,
                          last_name: answer.last_name,
                          role_id: answer.role_id,
                          manager_id: answer.manager_id,
                      },
                         function (err, res) {
                          if (err) throw err;
                          console.table(res);
                          runSearch();
                         });
              });
              });
                        
  });
            };
                 

  function viewAllRoles()
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      console.table(res);
      runSearch();
    });
    
  

  function updateRole() {}

runSearch();

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ......................reference code..........................................................
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//  Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// function viewEmployees() {
//     console.log("Selecting all employees....\n");
//     connection.query("SELECT * FROM employee", function (err, res) {
//       if (err) throw err;
//       //log results from the SELECT statement
//       console.log(res.length + " employees found.");
//       console.table('All Employees', res);
//       startEmployee();
//     });
//   }

//     ]).then(function (data) {
//         let engineer = new Engineer(data.name, data.id, data.email, data.github);
//         employeeInformation.push(engineer);

//         switch (data.position) {
//             case "Engineer":
//                 makeEngineer();
//                 break;
//             case "Intern":
//                 makeIntern();
//                 break;
//             default:
//                 createHtml();
//         }
//     });
// }
//     ]).then(function (data) {
//         let intern = new Intern(data.name, data.id, data.email, data.school);
//         employeeInformation.push(intern);

//         switch (data.position) {
//             case "Engineer":
//                 makeEngineer();
//                 break;
//             case "Intern":
//                 makeIntern();
//                 break;
//             default:
//                 createHtml();
//         }
//     });
// }
// function createHtml() {
//     fs.writeFileSync(outputPath, render(employeeInformation), "utf-8")
// }

// makeManager();
