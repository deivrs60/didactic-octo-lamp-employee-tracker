const db = require('./db/connection');
const inquirer = require('inquirer');


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
