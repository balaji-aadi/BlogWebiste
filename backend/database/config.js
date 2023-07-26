const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456789',
    database : 'blog'
});


module.exports = db