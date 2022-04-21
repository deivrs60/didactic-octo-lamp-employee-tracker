const mysql = require('mysql2');

require('dotenv').config();

/// connects to the data base 

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME

    },

    console.log(process.env),
    console.log(`Connected to the ${process.env.DV_NAME} database.`)
    )
    
    db.connect(err => {
        if(err) throw err;
    });




    module.exports = db;