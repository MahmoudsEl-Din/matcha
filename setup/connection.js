var mysql      = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qwerty'
})

connection.connect()

connection.query('CREATE DATABASE IF NOT EXISTS matcha_db', function(err){
    if (err) throw err
    connection.query('USE matcha_db', function(err){
        if (err) throw err
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
            + 'username VARCHAR(250) NOT NULL,'
            + 'name VARCHAR(250) NOT NULL,'
            + 'password VARCHAR(250) NOT NULL,'
            + 'lastname VARCHAR(250) NOT NULL,'
            + 'email VARCHAR(250) NOT NULL,'
            + 'genre VARCHAR(2) NOT NULL,'
            + 'desire VARCHAR(2) NOT NULL,'
            + 'bio VARCHAR(250) NOT NULL'
        + ')')
    })
})

module.exports = connection