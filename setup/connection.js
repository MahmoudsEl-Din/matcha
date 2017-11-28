
class init_db {
    constructor() {
        this.mysql = require('mysql')
        this.connection = this.mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : 'qwerty'
        })

        this.connection.connect((error) => {
            if (error) throw error
        })

        this.connection.query('CREATE DATABASE IF NOT EXISTS matcha_db;', (error) => {
            if (error) throw error
        })
        this.connection.query('USE matcha_db;', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
            + 'username VARCHAR(250) NOT NULL,'
            + 'name VARCHAR(250) NOT NULL,'
            + 'password VARCHAR(250) NOT NULL,'
            + 'lastname VARCHAR(250) NOT NULL,'
            + 'email VARCHAR(250) NOT NULL,'
            + 'genre VARCHAR(2) NOT NULL,'
            + 'desire VARCHAR(2) NOT NULL,'
            + 'bio VARCHAR(250) NOT NULL,'
            + 'activate VARCHAR(250) NOT NULL'
            + ');', (error) => {
                if (error) throw error
        })

        let sql = "SELECT * FROM users;"
        this.connection.query(sql, (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                sql = "INSERT INTO `users` (`id`, `username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`, `activate`) VALUES" +
                    "(1, 'usernametest', 'nametest', 'e8bf9bc2b848f897f3c3471a4a9a1ebe571d3fb386081a9e048dde4981000d974c0bcfe43eefec1b244471e9cb193e8b0331209e0007bae607c1b977eb079ebc', 'lastnametest', 'emailtest@gmail.com', 'M', 'F', 'It is a test of a bio written by a test user', 0)" +
                    ";" 
                this.connection.query(sql, (error) => {
                    if (error) throw error
                })
            }
        })
        global.connection = this.connection
    }
}

module.exports = init_db