const mysql = require('mysql2');

require('dotenv').config();

/// connects to the data base 

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'writePassword',
        database: 'tracker'

    },

    console.log(`Connected to the "Tracker" database.`)
    )
    
    db.connect(err => {
        if(err) throw err;
    });




    module.exports = db;