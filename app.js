const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var dbConn = mysql.createConnection({
    host: "localhost",
    // port; if not 3306
    port: 3306,
    // username
    user: "root",
    // password and database name
    password: "password",
    database: "asset_DB"
});

dbConn.connect(function (err) {
    if (err) throw err;
    console.log("you connected it on id: " + dbConn.threadId + "\n");
    getAction();
    // getEmployees();
    // getOwners();
});

function getAction() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "what would you like to do?",
                choices: ["add employee", "add role", "add department", "view emloyees", "view departments", "view roles", "quit the app", " "],
                default: ["add employee"],
                name: "action"
            }
        ])
        .then(value => {
            switch (value.action) {
                case "add employee":
                    addEmployee();
                    break;
                case "add role":
                    addRole();
                    break;
                case "add department":
                    addDepartment();
                    break;
                case "view emloyees":
                    getEmployees();
                    break;
                case "view departments":
                    getDepartments();
                    break;
                case "view roles":
                    getRoles();
                    break;
                case "quit the app":
                    appQuit();
                    break;
                case " ":
                    appQuit();
                    break;
            }
        });
}

function getEmployees() {
    console.log("\n");
    console.log(" ---- employees ----");
    dbConn.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // dbConn.end();
        getAction();
    });
}

function getRoles() {
    console.log("\n");
    console.log(" ---- roles ----");
    dbConn.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        // dbConn.end();
        getAction();
    });
}

function getDepartments() {
    console.log("\n");
    console.log(" ---- departments ----");
    dbConn.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        getAction();
    });
}

// function getOwners() {
// function countOwners() {
//     dbConn.query("SELECT COUNT(*) FROM employee WHERE role_id = 1", function (err, res) {
//         if (err) throw err;
//         console.log(" ---- owners ----");
//         console.table(res);
//     });
// }
// countOwners();
// dbConn.query("SELECT * FROM employee WHERE role_id = 1", function (err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(" ---- owners ----");
//     console.table(res);
//     getEmployees();
// });
// }

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "please enter the new Department name.",
                name: "newDept"
            },
            {
                type: "list",
                message: "Add another Department?",
                choices: ["yes", "no, I'm done."],
                default: ["yes"],
                name: "another"
            }
        ])
        .then(res => {
            dbConn.query(
                "INSERT INTO department SET ?",
                { name: res.newDept },
                function (err) {
                    if (err) throw err;
                    console.log("Your new department was created successfully!");
                }
            );
            if (res.another === "yes") {
                addDepartment();
            } else {
                getDepartments();
            }
        });
}

function addRole() {
    // var deptNames = [{name:"dog"}, {name: "chicken"}, {name: "cat"}, {name: "pig"}];
    // console.log(deptNames);
    deptName = [];
    var deptName = ['dog', 'chicken', 'cat'];
    var deptNames = [];

    dbConn.query("SELECT name FROM department", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            deptNames.push(res[i].name);
        }
        if (err) throw err;

        console.log(deptNames);
        console.log(deptName);
    });


    // inquirer
    //     .prompt([
    //         {
    //             type: "list",
    //             message: "please enter your departement.",
    //             choices: deptName,
    //             name: "newRole"
    //         },
    //         {
    //             type: "input",
    //             message: "what is the salary for this role?",
    //             name: "salary"
    //         },
    //         {
    //             type: "list",
    //             message: "add another Role?\n\n",
    //             choices: ["yes", "no, I'm done."],
    //             default: "yes",
    //             name: "another"
    //         }
    //     ])
    //     .then(res => {
    //         dbConn.query(
    //             "INSERT INTO role SET ?",
    //             {
    //                 title: res.newRole,
    //                 salary: res.salary
    //             },
    //             function (err) {
    //                 if (err) throw err;
    //                 console.log("Your new role was added.");
    //             }
    //         );
    //         if (res.another === "yes") {
    //             addRole();
    //         } else {
    getAction();
    //         }
    //     });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "please enter the Employee's First Name.",
                name: "f_name"
            },
            {
                type: "input",
                message: "please enter the Employee's Last Name.",
                name: "l_name"
            },
            {
                type: "input",
                message: "please enter the Employee's Role.",
                name: "role"
            },
            {
                type: "input",
                message: "please enter the Employee's Manager ID.",
                name: "man_id"
            },
            {
                type: "list",
                message: "Add another Employe?",
                choices: ["yes", "no, I'm done."],
                default: ["yes"],
                name: "another"
            }
        ])
        .then(res => {
            dbConn.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: res.f_name,
                    last_name: res.l_name,
                    role_id: res.role,
                    manager_id: res.man_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new employee has been added!\n");
                }
            );
            // getEmployees();
            if (res.another === "yes") {
                addEmployee();
            } else {
                getAction();
            }
        });
}

function appQuit() {
    dbConn.end;
    process.exit(0);
}