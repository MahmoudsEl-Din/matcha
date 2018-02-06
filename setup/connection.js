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
            + 'age INT NOT NULL,'            
            + 'lat decimal(38, 16) NOT NULL,'
            + 'lng decimal(38, 16) NOT NULL,'
            + 'pop decimal(38, 16), CHECK (pop BETWEEN 0.00 AND 100.00)'
            + ');', (error) => {
                if (error) throw error
            dontLeaveMeEmpty('users', 'setup/users.csv')
        })
      
        this.connection.query('CREATE TABLE IF NOT EXISTS code('
            + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
            + 'userid INT NOT NULL,'
            + 'code VARCHAR(250) NOT NULL,'
            + 'type INT NOT NULL'
            + ');', (error) => {
                if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS tags('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'
        + 'tag_name VARCHAR(250) NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('tags', 'setup/tags.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS tag_list('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'tag_name VARCHAR(250) NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('tag_list', 'setup/tag_list.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS pictures('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'        
        + 'picture_name VARCHAR(250) NOT NULL,'
        + 'position INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS logged('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'userid INT NOT NULL,'        
        + 'time BIGINT NOT NULL,'
        + 'logout INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('logged', 'setup/logged.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS blocked('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'        
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS reported('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'        
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS likes('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_target INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('likes', 'setup/likes.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS sockets('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'socket_id VARCHAR(50) NOT NULL,'
        + 'session_id VARCHAR(50) NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('sockets', 'setup/sockets.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS notif('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_sender INT,'
        + 'type INT NOT NULL,'
        + 'data VARCHAR(250),'
        + 'shown INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
            dontLeaveMeEmpty('notif', 'setup/notif.csv')
        })

        this.connection.query('CREATE TABLE IF NOT EXISTS history('
        + 'id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,'
        + 'uid INT NOT NULL,'   
        + 'uid_visitor INT NOT NULL'
        + ');', (error) => {
            if (error) throw error
        })

        function dontLeaveMeEmpty (table, file) {
            let sql = "SELECT * FROM " +table+" ;"
            connection.query(sql, (error, results) => {
                if (error) throw error
                if (results.length === 0) {
                    sql = "LOAD DATA LOCAL INFILE '"+file+"' INTO TABLE "+table+" FIELDS TERMINATED BY ',' ENCLOSED BY '\"'LINES TERMINATED BY '\n' IGNORE 1 ROWS;"
                    connection.query(sql, [file, table], (error) => {
                        if (error) throw error
                        else
                        console.log("filling :" + table)
                    })
                }
            })
        }
       

        // let sql = "SELECT * FROM users;"
        // this.connection.query(sql, (error, results) => {
        //     if (error) throw error
        //     if (results.length === 0) {

        //         sql = "INSERT INTO `notif` VALUES"+
        //             "(1, 6, 2, 1, NULL, 1)," +
        //             "(2, 6, 2, 2, 'false', 0)" +                    
        //         ";" 
        //         this.connection.query(sql, (error) => {
        //             if (error) throw error
        //         })
                
        //         sql = "INSERT INTO `sockets` VALUES"+
        //             "(1, 1, 'fffff', 'fffff')," +
        //             "(2, 2, 'fffff', 'fffff')," +
        //             "(3, 3, 'fffff', 'fffff')," +
        //             "(4, 4, 'fffff', 'fffff')," +
        //             "(5, 5, 'fffff', 'fffff')," +
        //             "(6, 6, 'fffff', 'fffff')," +
        //             "(7, 7, 'fffff', 'fffff')" +                    
        //         ";" 
        //         this.connection.query(sql, (error) => {
        //             if (error) throw error
        //         })

        //         sql = "INSERT INTO `logged` VALUES" +
        //             "(1, 1, 1169059692, 1)," +
        //             "(2, 2, 1169059692, 1)," +
        //             "(3, 3, 1169059692, 1)," +
        //             "(4, 4, 1169059692, 1)," +
        //             "(5, 5, 1169059692, 1)," +
        //             "(6, 6, 1169059692, 1)," +
        //             "(7, 7, 1169059692, 1)" +
        //         ";" 
        //         this.connection.query(sql, (error) => {
        //             if (error) throw error
        //         })
        //     }
        // })
        global.connection = this.connection
    }
}

module.exports = init_db