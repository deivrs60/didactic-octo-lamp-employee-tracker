const db = require('./db/connection');
const inquirer = require('inquirer');


// declaring the variables 
let department = ['None'];
let employeeArr = ['None'];
let employeeIds = [];
let role = [];
let roleInfo = [];
let roleId;
let managerId = null;

// run the prep queries 
function runQueries() {
    department = ['None'];
    role = ['None'];
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
        'Update an Employee Role',
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
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update an employee role":
                    updateEmployee();
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
    db.query(`
    SELECT role.title, role.id, department.name, role.salary 
    FROM role
    LEFT JOIN department ON role.department_id = department.id;`,
        (err, result) => {
            if(err) console.log(err)
            console.log('\n')
            console.table(result)
        }
    )
};

// EMPLOYEES TABLE 
const viewEmployees = () => {
    db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee m ON employee.manager_id = m.id;`,
        (err, result) => {
            if(err) console.log(err)
            console.log('\n')
            console.table(result)
        }
    )
};

// add new department to department table
function addDepartment () {
    inquirer.prompt(
        {
            type: 'input',
            name: 'addDepartment',
            message: 'Please enter the name of the Department you would like to add. (30 character limit)',
            vaildate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('Please enter a valid Department name.')
                    return false;
                }
            }
        }
    ).then((data) => {
        sql =  `INSERT INTO department
                VALUES (DEFAULT, '${data.addDepartment}');`
        db.query(sql, (err, res) => {
            if(err) console.log(err)
        });
        console.log(`${data.addDepartment} department added to the database.`)
        init();
    })
}

// add new role to the role table
function addRole() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter the name of the Role you would like to add. (30 char limit)',
            validate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('Please enter a valid role name.')
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter an annual salary for the role. (Only digits may be entered.)',
            validate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('Please enter a valid response.')
                    return false;

                }
            }
        },
        {
            type: 'list',
            name: 'department',
            message: 'Please choose a department to add this role to.',
            choices: department
        }
    ]).then((data) => {
        let departmentId  = null;
        db.query( `SELECT * FROM department `, (err, res) => {
            if(err) console.log(err)
            res.forEach( element => {
                if(element.name === data.department) {
                    departmentId = element.department_id
                    return;
                }
            })  
            sql = ` INSERT INTO role VALUES (DEFAULT, '${data.title}', ${data.salary}, '${departmentId}'); `
            db.query(sql, (err, res) => {
                if(err) console.log(err)
            });
            console.log(`${data.title} role has been added to the database.`)
            init();
        }) 
    })
}


// function to add new employee(s)
function addEmployee () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the Employee you want to add. (30 char limit)',
            validate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('Please enter a valid first name.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee you would like to add. (30 char limit)',
            validate: input => {
                if(input) {
                    return true;
                } else {
                    console.log('Please enter a valid last name.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'role',
            message: 'Please select the employees role.',
            choices: role
        },
        {   type: 'list', 
            name: 'manager',
            message: 'Who is this employees manager.',
            choices: employeeArr
        }
    ]).then((data) => {
        roleInfo.forEach(element => {
            switch(data.role) {
                case element.title:
                    roleId = element.roleId
                    break;
            }
        })
        employeeIds.forEach(element => {
            if(element.first_name + ' ' + element.last_name === data.manager) {
                managerId = element.id;
                return;
            }
        })
        sql =  `INSERT INTO employee VALUES (DEFAULT, '${data.firstName}', '${data.lastName}', '${roleId}', '${managerId}');`
        db.query(sql, (err, res) => {
            if(err) console.log(err)
        });
        console.log(`${data.role} role added to the database.`)
        init();
    })
}

function updateEmployee() {
    let employeeIdUpdate;

    return inquirer.prompt([ 
        {
            type: 'list',
            name: 'employeeUpdate',
            message: 'Which employee would you like to update?',
            choices: employeeArr
        },
        {
            type: 'list',
            name: 'newRole',
            message: 'Please choose the employees new role.',
            choices: role
        }
    ]).then(data => {
        roleInfo.forEach(element => {
            switch (data.newRole) {
                case element.title:
                    roleId = element.id
                    break;
            }
        })

        employeeIds.forEach(element => {
            let caseString = element.first_name + ' ' + element.last_name;
            switch (data.employeeUpdate) {
                case (caseString) :
                    employeeUpdate = element.id;
                    break;
            }
        })
        sql = `UPDATE employee set id = '${roleId}' WHERE id = ${employeeIdUpdate};`
        db.query(sql, (err, res) => {
            if(err) console.log(err) 
        });
        console.log(`${data.employeeUpdate} role updated to ${data.newRole} and added to the database.`)
    })

    
}

init();