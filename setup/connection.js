
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
            + 'bio VARCHAR(250) NOT NULL'
            + ');', (error) => {
                if (error) throw error
        })

        let sql = "SELECT * FROM users;"
        this.connection.query(sql, (error, results) => {
            if (error) throw error
            if (results.length === 0) {
                sql = "INSERT INTO `users` (`id`, `username`, `name`, `password`, `lastname`, `email`, `genre`, `desire`, `bio`) VALUES" +
                    "(1, 'usernametest', 'nametest', 'cfb19a0441cc9ee770ab19407789ec37ad670aab57c60990482259348dbd988fd4b744e2737c8b34269263388f7b9c6de9a1771a7872630789c2e64b88661c0e', 'lastnametest', 'emailtest@gmail.com', 'M', 'F', 'It is a test of a bio written by a test user')" +
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