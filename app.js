const inquirer = require("inquirer");
const mysql = require("mysql");

require("console.table");

// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "DigitalNinja1!",
    database: "employee_tracker"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // start();
    console.log("this is connected!");
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "startQuestion",
            type: "list",
            message: "What would you want to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", "Update employee"]
        })
        .then(function (answer) {
            // based on their answer
            if (answer.startQuestion === "View all departments") {
                viewDepartments();
            } else if (answer.startQuestion === "View all roles") {
                viewRoles();
            } else if (answer.startQuestion === "View all employees") {
                viewEmployees();
            } else if (answer.startQuestion === "Add department") {
                addDepartment();
            } else if (answer.startQuestion === "Add role") {
                addRole();
            } else if (answer.startQuestion === "Add employee") {
                addEmployee();
            } else if (answer.startQuestion === "Update employee") {
                updateEmployee();
            } else {
                connection.end();
            }
        });
}


// View Departments
function viewDepartments() {
    connection.query("SELECT name FROM departments", function(err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

// View Roles
function viewRoles() {
    connection.query("SELECT title FROM roles", function(err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

// View Employees
function viewEmployees() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        console.log(results);
        start();
    });
}

// Add Department
function addDepartment() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        console.log(results);
        start();
    });
}

// Add Role
function addRole() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        console.log(results);
        start();
    });
}

// Add Employee
function addEmployee() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        console.log(results);
        start();
    });
}

// Update Employee
function updateEmployee() {
    connection.query("SELECT * FROM employees", function(err, results) {
        if (err) throw err;
        console.log(results);
        start();
    });
}