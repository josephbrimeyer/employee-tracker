let mysql = require("mysql");
let dotenv = require("dotenv").config();
let inquirer = require("inquirer");


// functions for user selected criteria
// viewAllEmployees
// viewAllEmployeesByDepartment
// viewAllEmployeesbyManager
// addEmployee
// removeEmployee
// updateEmployee
// updateEmployeeRole
// updateEmployeeManager
// viewAllRoles
// addRole
// removeRole
// addDepartment

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: process.env.DB_PASSWORD,
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});
// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first-name",
            message: "What is the Employee's first name?"
        },
        {
            type: "input",
            name: "last-name",
            message: "What is the Employee's last name?"
        },
        {
            type: "input",
            name: "role",
            message: "What is the Employee's role?"
        }        
        ]).then(function (answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first-name,
                last_name: answer.last-name 
            },
            function (err) {
                if (err) throw err;
                console.log("You're employee was added successfully")
            }
        )

        switch (data.position) {
            case "Engineer":
                makeEngineer();
                break;
            case "Intern":
                makeIntern();
                break;
            default:
                createHtml();
        }
    });
}


// function makeEngineer() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "name",
//             message: "What is the Engineer's name?"
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "What is the Engineer's email address?"
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is the Engineer's id number?"
//         },
//         {
//             type: "input",
//             name: "github",
//             message: "Enter the Engineer's GitHub user name:",
//         },
//         {
//             type: "list",
//             name: "position",
//             message: "Would you like to add another role?",
//             choices: ['Engineer', 'Intern', 'Exit'],
//         }
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

// function makeIntern() {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "name",
//             message: "What is the Intern's name?"
//         },
//         {
//             type: "input",
//             name: "email",
//             message: "What is the Intern's email address?"
//         },
//         {
//             type: "input",
//             name: "id",
//             message: "What is the Intern's id number?"
//         },
//         {
//             type: "input",
//             name: "school",
//             message: "What is the name of the Intern's school?",
//         },
//         {
//             type: "list",
//             name: "position",
//             message: "Would you like to add another role?",
//             choices: ['Engineer', 'Intern', 'Exit'],
//         }
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