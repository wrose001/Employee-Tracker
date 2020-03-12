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
    connection.query("SELECT department FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

// View Roles
function viewRoles() {
    connection.query("SELECT roles.title, roles.salary, departments.department FROM roles left join departments on roles.departments_id = departments.id ORDER BY roles.id;", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    });
}

// View Employees
function viewEmployees() {
    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary FROM employees
        left join roles on employees.roles_id = roles.id
        left join departments on roles.departments_id = departments.id ORDER BY employees.id;`,
        function (err, results) {
            if (err) throw err;
            console.table(results);
            start();
        });
}



// Add Department
function addDepartment() {
    inquirer.prompt({
        name: "department",
        type: "input",
        message: "What is the new department name?"
    }).then(function (answer) {
        console.log(answer);
        connection.query(`INSERT INTO departments (department) VALUES ('${answer.department}')`, function (err, results) {
            if (err) throw err;
            console.table(results);
            start();
        })

    });

}

//adding role for department
function deptChoice() {
    return new Promise((resolve, reject) => {
        connection.query("Select id, department FROM departments", function (err, data) {
            if (err) throw err;
            resolve(data);
        })
    })
}
// Add Role
function addRole() {
    deptChoice().then(function (id) {
        idList = id.map(departments => departments.id);
        inquirer.prompt([{
                name: "title",
                type: "input",
                message: "What is the new role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the new salary?"
            },
            {
                name: "depatId",
                type: "list",
                message: "Which depatment do you want to connect?",
                choices: idList

            }
        ]).then(function (answer) {
            connection.query(`INSERT INTO roles (title, salary, departments_id) VALUES ("${answer.title}", ${answer.salary}, ${answer.depatId});`, function (err, data) {
                if (err) throw err;
                console.table(data);
                start();
            });
        });
    });
}

// Add Employee


//adding role for department
function roleChoice() {
    return new Promise((resolve, reject) => {
        connection.query("Select id, title FROM roles", function (err, data) {
            if (err) throw err;
            resolve(data);
        });
    });
}

function addEmployee() {
    roleChoice().then(function (id) {
        idRoles = id.map(roles => roles.id);
        inquirer.prompt([{
                    name: "firstName",
                    type: "input",
                    message: "What is your first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is your last name?"
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is your new role?",
                    choices: idRoles
                }
            ])
            .then(function (answer) {
                connection.query(`INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES
 ("${answer.firstName}", "${answer.lastName}", ${answer.role}, Null)`, function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    start();
                });
            });
    });
}