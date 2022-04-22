const db = require('./db/connection');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');


// declaring the variables 
let department = ['None']
let employeeArr = ['None'];
let employeeIds = [];
let role = [];
let roleInfo = [];
// let roleId;
// let managerId = null;

// run the prep queries 
function runQueries() {
    department = ['None'];
    role = [];
    employeeArr = ['None'];
    employeeIds = [];


db.query(`SELECT name FROM department;`, (err, res) => {
    if (err) console.log(err);
    res.forEach(element => department.push(element.name));
})

// retrieve roles 
db.query(`SELECT title FROM role`, (err, res) => {
    if(err) console.log(err);
    res.forEach(element => role.push(element.title));
})

// retireve salary and department
db.query(`SELECT title, id FROM role`, (err, res) => {
    if(err) console.log(err);
    roleInfo = res;
})

// retrieve employees 
db.query(`SELECT * FROM employees;`, (err, res) => {
    if(err) console.log(err);
    res.forEach(element => employeeArr.push(element.first_name + ' ' + element.last_name));
    employeeIds = res;
})
}


/////// begin command line app


const init = () => {
    runQueries;

    // prompt user response to begin 
    let message = 'What would you like to do?';
    let choices = [
        'View departments',
        'View roles',
        'View employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        "Exit"
    ];

    // begin using inquirer 
    inquirer.prompt( 
        {
            type: 'list',
            name: 'choice',
            message: message,
            choices: choices
        }
        ).then((promptChoice) => {
            switch(promptChoice.choice) {
                case "View departments":
                    viewDepartments();
                    init();
                    break;
                case "View roles":
                    viewRoles();
                    init();
                    break;
                case "View employees":
                    viewEmployees();
                    init();
                    break;
                case "Add a department":
                    AddDepartment();
                    init();
                    break;
                case "Add a role":
                    addRole();
                    init;
                    break;
                case "Add an employee":
                    addEmployee();
                    init;
                    break;
                case "Exit":
                    console.log("Thank you for using the Employee Tracker. Press Ctrl + C to return to the terminal.");
                    break;
            }
        }
    );
}

// sql queries to show database tables depending on user selection from switch above

// DEPARTMENT TABLE
const viewDepartments = () => {
    db.query(`SELECT * FROM department;`, 
        (err, result) => {
            if(err) console.log(err)
            console.log('\n')
            console.table(result)
        }
    )
}

// ROLE TABLE 
const viewRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary 
    FROM role
    LEFT JOIN department ON role.department_id = department.id;`,
        (err, result) => {
            if(err) console.log(err)
            console.log('\n')
            console.table(result)
        }
    )
};

// id INT AUTO_INCREMENT PRIMARY KEY,
// title VARCHAR(30) NOT NULL,
// salary DECIMAL NOT NULL,
// department_id INT,


init();