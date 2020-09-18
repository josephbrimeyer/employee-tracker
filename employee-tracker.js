let mysql = require("mysql");
require("dotenv").config();
let inquirer = require("inquirer");

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
        "Add a department",
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
      }
    });
}
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

function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      let roleList = res[i].title;
      console.log(roleList);
      roleArrray.push(roleList);
    }
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "first-name",
        message: "What is the Employee's first name?",
      },
      {
        type: "input",
        name: "last-name",
        message: "What is the Employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the Employee's role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first - name,
          last_name: answer.last - name,
        },
        function (err) {
          if (err) throw err;
          console.log("You're employee was successfully added");
        }
      );
    });
}
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
